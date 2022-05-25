import { FC, useState } from 'react';
import debounce from 'lodash.debounce';
import { Category, Task } from 'types/task';
import {
  Attention as AttentionType,
  ChangingColumn,
  InitialValues,
  initialFilter,
  SortOptions,
  DropName,
  Columns,
  Filter,
  NewID,
} from './type';
import {
  setColumnFiltering,
  changeColumnName,
  setTaskOnColumn,
  setColumnSort,
  deleteColumn,
  clearColumn,
  addNewTags,
  onDragEnd,
} from './helper';
import {
  DEFAULT_COLUMN_NAME,
  ATTENTION_DELETE,
  ATTENTION_CLEAR,
  PURE_CONTENT,
} from 'constants/tests';
//Components
import Attention from 'ui-kit/Attention';
import ChangedOldTask from './ChangedOldTask';
import Content from './Content';
import CreatedNewTask from './CreatedNewTask';
import Nav from './Nav';
import { Wrapper, Advertising } from './styled';

interface TasksProps {
  data: Columns;
  tags: string[];
  newIDForTask: number;
  newIDForColumn: number;
  sendTasks: (data: Task[]) => void;
  sendTags: (tags: string[]) => void;
  sendCategories: (categories: Category[]) => void;
}

type PopupType = {
  createdNewTask: InitialValues | null;
  changedOldTask: Task | null;
};

const Tasks: FC<TasksProps> = ({
  data,
  tags,
  newIDForTask,
  newIDForColumn,
  sendTasks,
  sendTags,
  sendCategories,
}: TasksProps) => {
  const [columns, setColumns] = useState<Columns>(data);
  const [attention, setAttention] = useState<AttentionType | null>(null);
  const [sorting, setSorting] = useState<SortOptions | null>(null);
  const [filtering, setFiltering] = useState<Filter>(initialFilter);
  const [openPopup, setOpenPopup] = useState<PopupType>({
    createdNewTask: null,
    changedOldTask: null,
  });
  const [newID, setNewID] = useState<NewID>({
    column: newIDForColumn,
    task: newIDForTask,
  });

  const addNewColumn = () => {
    const newValue = {
      name: DEFAULT_COLUMN_NAME,
      categories_id: newID.column,
      tasks: [],
    };
    setColumns((prev) => ({ ...prev, [newID.column]: newValue }));
  };

  //set the attention before clear or delete the column
  const setAttentionData = (value: ChangingColumn, category_id: number) => {
    const title =
      value === ChangingColumn.clear ? ATTENTION_CLEAR : ATTENTION_DELETE;
    setAttention({ base: value, category_id, title });
  };

  //clear or delete the column and send result on the back
  const changeColumn = () => {
    if (!attention) return;
    const newColumns =
      attention.base === ChangingColumn.clear
        ? clearColumn(columns, attention.category_id)
        : deleteColumn(columns, attention.category_id);

    setColumns(newColumns);

    //delete tasks of column
    formDataByTasks(newColumns);
    if (attention.base === ChangingColumn.delete) {
      //delete t column
      formDataByCategories(newColumns);
    }
    setAttention(null);
  };

  const saveMadeOfColumn = (name: string) => {
    //change name of column
    setColumns((prev) => changeColumnName(prev, newID.column, name));
    setNewID((prev) => ({ ...prev, column: prev.column + 1 }));
    formDataByColumn(name);
  };
  const setMadeOfColumn = (id: number) => {
    //create a new ID for column
    setNewID((prev) => ({ ...prev, column: id }));
  };

  const formDataByColumn = (name: string) => {
    const newColumns = changeColumnName(columns, newID.column, name);
    formDataByCategories(newColumns);
  };
  const formDataByCategories = (value: Columns) => {
    const categories: Category[] = Object.entries(value).map(
      ([order, { name, categories_id }]) => ({
        id: categories_id,
        name,
        order: Number(order),
      }),
    );
    sendCategories(categories);
  };
  const formDataByTasks = (value: Columns) => {
    const data = Object.values(value)
      .map((column) => column.tasks)
      .flat();
    sendTasks(data);
  };

  //changing or creating the task
  const setTask = (values: Task, isNewTask?: boolean) => {
    const newColumns = setTaskOnColumn(columns, values, isNewTask);
    const newTags = addNewTags(values.tags, tags);
    newTags.length && sendTags(newTags);
    setColumns(newColumns);
    formDataByTasks(newColumns);
    setNewID((prev) => ({ ...prev, task: prev.task + 1 }));
    setOpenPopup({ createdNewTask: null, changedOldTask: null });
  };

  const changeFiltering = (param: Filter) => {
    setFiltering(param);
    const newColumns = debounce(
      setColumnFiltering(columns, param.tags.value),
      1000,
    );
    setColumns(newColumns);
  };

  //sorting tasks in column for datecreated and ABC
  const sortColumn = (options: SortOptions, categories_id: number) => {
    const newColumns = setColumnSort(columns, options, categories_id);
    setSorting(options);
    setColumns(newColumns);
  };

  const AttentionComponent = attention && (
    <Attention onAgree={changeColumn} onDisagree={() => setAttention(null)}>
      {attention.title}
    </Attention>
  );

  //popup with functional of changing the task
  const ChangedOldTaskComponent = openPopup.changedOldTask && (
    <ChangedOldTask
      task={openPopup.changedOldTask}
      tags={tags}
      setTask={setTask}
      onClose={() =>
        setOpenPopup((prev) => ({ ...prev, changedOldTask: null }))
      }
    />
  );

  //popup with functional of creating the new task
  const CreatedNewTaskComponent = openPopup.createdNewTask && (
    <CreatedNewTask
      tags={tags}
      dataOfNewTask={openPopup.createdNewTask}
      setTask={setTask}
      categoryName={openPopup.createdNewTask.name}
      onClose={() => () =>
        setOpenPopup((prev) => ({ ...prev, createdNewTask: null }))}
    />
  );

  const PureComponent = !Object.values(columns).length && (
    <Advertising>{PURE_CONTENT}</Advertising>
  );

  return (
    <Wrapper>
      <Nav
        filtering={filtering}
        addNewColumn={addNewColumn}
        changeFiltering={changeFiltering}
      />
      <Content
        onDragEnd={(result) => {
          //zeroing sorting before dragging
          if (result.type === DropName.subItem) {
            setSorting(null);
          }
          return onDragEnd(result, columns, setColumns, {
            dropColumn: formDataByCategories,
            dropTask: formDataByTasks,
          });
        }}
        sorting={sorting}
        sortColumn={sortColumn}
        setMadeOfColumn={setMadeOfColumn}
        saveMadeOfColumn={saveMadeOfColumn}
        newColumnID={newID.column}
        changeOldTask={(task: Task) =>
          setOpenPopup((prev) => ({ ...prev, changedOldTask: task }))
        }
        createNewTask={(values) =>
          setOpenPopup((prev) => ({
            ...prev,
            createdNewTask: { ...values, id: newID.task },
          }))
        }
        changeColumn={setAttentionData}
        columns={columns}
      />
      {ChangedOldTaskComponent}
      {CreatedNewTaskComponent}
      {AttentionComponent}
      {PureComponent}
    </Wrapper>
  );
};

export default Tasks;
