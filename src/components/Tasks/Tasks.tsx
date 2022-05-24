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
  setTaskOnColumn,
  setColumnSort,
  deleteColumn,
  clearColumn,
  changeName,
  onDragEnd,
} from './helper';
import {
  ATTENTION_DELETE,
  ATTENTION_CLEAR,
  PURE_CONTENT,
} from 'constants/tests';
//Components
import WrapperModal from 'ui-kit/WrapperModal';
import Attention from 'ui-kit/Attention';
import OpenedCard from './OpenedCard';
import Content from './Content';
import NewCard from './NewCard';
import Nav from './Nav';
import { Wrapper, Advertising } from './styled';

interface TasksProps {
  data: Columns;
  tags: string[];
  newIDForTask: number;
  newIDForColumn: number;
  sendCategories: (categories: Category[]) => void;
  sendTasks: (data: Task[]) => void;
  sendTags: (tags: string[]) => void;
}

const Tasks: FC<TasksProps> = ({
  data,
  tags,
  newIDForTask,
  newIDForColumn,
  sendCategories,
  sendTasks,
  sendTags,
}: TasksProps) => {
  const [columns, setColumns] = useState<Columns>(data);
  const [newID, setNewID] = useState<NewID>({
    column: newIDForColumn,
    task: newIDForTask,
  });
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<InitialValues | null>(null);
  const [attention, setAttention] = useState<AttentionType | null>(null);
  const [filtering, setFiltering] = useState<Filter>(initialFilter);
  const [sorting, setSorting] = useState<SortOptions | null>(null);

  const addNewColumn = () => {
    const newValue = {
      name: 'New Column',
      categories_id: newID.column,
      tasks: [],
    };
    setColumns((prev) => ({ ...prev, [newID.column]: newValue }));
  };

  const setAttentionData = (value: ChangingColumn, category_id: number) => {
    if (value === ChangingColumn.clear) {
      return setAttention({ base: value, category_id, title: ATTENTION_CLEAR });
    }
    return setAttention({ base: value, category_id, title: ATTENTION_DELETE });
  };
  const changeColumn = () => {
    if (!attention) return;
    const newColumns =
      attention.base === ChangingColumn.clear
        ? clearColumn(columns, attention.category_id)
        : deleteColumn(columns, attention.category_id);

    setColumns(newColumns);

    formDataByTasks(newColumns);
    if (attention.base === ChangingColumn.delete) {
      formDataByCategories(newColumns);
    }
    setAttention(null);
  };

  const saveMadeOfColumn = (name: string) => {
    setColumns((prev) => changeName(prev, newID.column, name));
    setNewID((prev) => ({ ...prev, column: prev.column + 1 }));
    formDataByColumn(name);
  };
  const setMadeOfColumn = (id: number) => {
    setNewID((prev) => ({ ...prev, column: id }));
  };

  const formDataByColumn = (name: string) => {
    const newColumns = changeName(columns, newID.column, name);
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
  const setTask = (values: Task, isNewTask?: boolean) => {
    const newColumns = setTaskOnColumn(columns, values, isNewTask);
    const newTags = addNewTags(values.tags, tags);
    newTags.length && sendTags(newTags);
    setColumns(newColumns);
    formDataByTasks(newColumns);
    setNewID((prev) => ({ ...prev, task: prev.task + 1 }));
    newTask && setNewTask(null);
    openTask && setOpenTask(null);
  };

  const addNewTags = (newTags: string[], oldTags: string[]) => {
    const data = newTags.filter((tag) => !oldTags.includes(tag));
    return [...data, ...oldTags];
  };

  const changeFiltering = (param: Filter) => {
    setFiltering(param);
    const newColumns = debounce(
      setColumnFiltering(columns, param.tags.value),
      1000,
    );
    setColumns(newColumns);
  };

  const sortColumn = (options: SortOptions, categories_id: number) => {
    const newColumns = setColumnSort(columns, options, categories_id);
    setSorting(options);
    setColumns(newColumns);
  };

  return (
    <Wrapper>
      <Nav
        addNewColumn={addNewColumn}
        filtering={filtering}
        changeFiltering={changeFiltering}
      />
      {!Object.values(columns).length && (
        <Advertising>{PURE_CONTENT}</Advertising>
      )}
      {openTask && (
        <WrapperModal onClose={() => setOpenTask(null)}>
          <OpenedCard task={openTask} tags={tags} setTask={setTask} />
        </WrapperModal>
      )}
      {newTask && (
        <WrapperModal onClose={() => setNewTask(null)}>
          <NewCard
            tags={tags}
            dataOfNewTask={newTask}
            setTask={setTask}
            categoryName={
              Object.values(columns).find(
                ({ categories_id }) => categories_id === newTask?.category_id,
              )?.name
            }
          />
        </WrapperModal>
      )}
      {attention && (
        <Attention onAgree={changeColumn} onDisagree={() => setAttention(null)}>
          {attention.title}
        </Attention>
      )}
      <Content
        onDragEnd={(result) => {
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
        openTask={(task: Task) => setOpenTask(task)}
        createNewTask={(values) => setNewTask({ ...values, id: newID.task })}
        changeColumn={setAttentionData}
        columns={columns}
      />
    </Wrapper>
  );
};

export default Tasks;
