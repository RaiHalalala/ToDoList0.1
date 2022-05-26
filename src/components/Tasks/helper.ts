import { SetStateAction } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { Columns, DropName, ID, SortOptions } from './type';
import { Task } from 'types/task';

export const onDragEnd = (
  result: DropResult,
  columns: Columns,
  setColumns: {
    (value: SetStateAction<Columns>): void;
  },
  saveData: {
    dropColumn: (value: Columns) => void;
    dropTask: (value: Columns) => void;
  },
) => {
  if (!result.destination) return;
  const { source, destination, type } = result;

  if (type === DropName.subItem) {
    if (source.droppableId === destination.droppableId) {
      //move to the same column
      const newColumns = onDropColumn(columns, source, destination);
      saveData.dropTask(newColumns);
      return setColumns(newColumns);
    }
    // move to the another column
    const newColumns = onDropAnotherColumn(columns, source, destination);
    saveData.dropTask(newColumns);
    return setColumns(newColumns);
  }
  if (type === DropName.item) {
    //move the column
    const newColumns = moveColumn(columns, source, destination);
    saveData.dropColumn(newColumns);
    return setColumns(newColumns);
  }
};

const onDropColumn = (
  columns: Columns,
  source: DraggableLocation,
  destination: DraggableLocation,
) => {
  //move to the same column
  const items = columns[source.droppableId];
  const copiedItems = { ...items };
  const [removed] = copiedItems.tasks.splice(source.index, 1);
  copiedItems.tasks.splice(destination.index, 0, removed);
  const reorderTasks = setOrderTasks(copiedItems.tasks);
  return {
    ...columns,
    [source.droppableId]: { ...copiedItems, tasks: reorderTasks },
  };
};

const onDropAnotherColumn = (
  columns: Columns,
  source: DraggableLocation,
  destination: DraggableLocation,
) => {
  // move to the another column
  const id = {
    sourceKey: source.droppableId,
    destKey: destination.droppableId,
    sourceIndex: source.index,
  };
  const { destColumn, removed, sourceItems } = toFormDataOnDrop(columns, id);
  const destItems = { ...destColumn };
  destItems.tasks.splice(destination.index, 0, removed);
  const reorderSourceTasks = setOrderTasks(sourceItems.tasks);
  const reorderDestTasks = setOrderTasks(destItems.tasks);
  return {
    ...columns,
    [source.droppableId]: { ...sourceItems, tasks: reorderSourceTasks },
    [destination.droppableId]: { ...destItems, tasks: reorderDestTasks },
  };
};

const setOrderTasks = (value: Task[]) =>
  value.map((item, index) => ({ ...item, order: index }));

const moveColumn = (
  columns: Columns,
  source: DraggableLocation,
  destination: DraggableLocation,
) => {
  //move the column
  const wrapper = Object.values(columns);
  const copiedWrapper = [...wrapper];
  const [removed] = copiedWrapper.splice(source.index, 1);
  copiedWrapper.splice(destination.index, 0, removed);
  return {
    ...Object.fromEntries(copiedWrapper.map((items, index) => [index, items])),
  };
};

const toFormDataOnDrop = (columns: Columns, id: ID) => {
  const sourceColumn = columns[id.sourceKey];
  const destColumn = columns[id.destKey];
  const sourceItems = { ...sourceColumn };
  const [removed] = sourceItems.tasks.splice(id.sourceIndex, 1);
  //change category_id of task at moving to the another column
  const movedCart: Task = { ...removed, category_id: destColumn.categories_id };
  return { destColumn, removed: movedCart, sourceItems };
};

export const changeColumnName = (
  value: Columns,
  newColumnID: number | null,
  newName: string,
) => {
  //use in setName & sendMadeOfColumn
  const wrapper = Object.entries(value);
  const newColumn = wrapper.map(([id, value]) =>
    id === newColumnID?.toString()
      ? [id, { ...value, name: newName }]
      : [id, value],
  );
  return Object.fromEntries(newColumn);
};

export const clearColumn = (value: Columns, category_id: number) => {
  const newColumns = Object.entries(value).map(([order, column]) =>
    column.categories_id === category_id
      ? [order, { ...column, tasks: [] }]
      : [order, column],
  );
  return Object.fromEntries(newColumns);
};
export const deleteColumn = (value: Columns, category_id: number) => {
  const newColumns = Object.entries(value).filter(
    ([_, column]) => column.categories_id !== category_id,
  );
  return Object.fromEntries(newColumns);
};

//when created new task, add the task in column
export const setTaskOnColumn = (
  columns: Columns,
  values: Task,
  isNewTask?: boolean,
) => {
  const mode = { isNewTask, values };
  const newColumns = Object.entries(columns).map(([id, column]) => {
    const tasks = convertTasks(column.tasks, mode);
    const newColumn = { ...column, tasks };
    return column.categories_id === values.category_id
      ? [id, newColumn]
      : [id, column];
  });
  return Object.fromEntries(newColumns);
};

//convert tasks depending on isNewTask or not
export const convertTasks = (
  tasks: Task[],
  params: {
    isNewTask?: boolean;
    values: Task;
  },
) => {
  if (params.isNewTask) {
    return [...tasks, params.values];
  }
  return tasks.map((task) =>
    task.id === params.values.id ? params.values : task,
  );
};

export const setColumnFiltering = (columns: Columns, value: string) => {
  const newColumns = Object.entries(columns).map(([id, column]) => [
    id,
    {
      ...column,
      tasks: column.tasks.map((task) =>
        task.tags.filter((tag) => tag.includes(value)).length && value
          ? { ...task, isActive: true }
          : { ...task, isActive: false },
      ),
    },
  ]);
  return Object.fromEntries(newColumns);
};

export const setColumnSort = (
  columns: Columns,
  options: SortOptions,
  categories_id: number,
) => {
  const newColumns = Object.entries(columns).map(([id, column]) =>
    column.categories_id === categories_id
      ? [id, { ...column, tasks: sort(column.tasks, options) }]
      : [id, column],
  );
  return Object.fromEntries(newColumns);
};

//sort by params datecreated & name
const sort = (tasks: Task[], options: SortOptions) => {
  const helper = () => {
    if (options.key === 'datecreated') {
      return sortByDateCreated(options.reverse);
    }
    if (options.key === 'name') {
      return sortByName;
    }
  };
  const copped = [...tasks];
  copped.sort(helper());
  return copped;
};

const sortByDateCreated = (reverse: boolean) => (a: Task, b: Task) => {
  const start = new Date(reverse ? a.datecreated : b.datecreated).getTime();
  const end = new Date(reverse ? b.datecreated : a.datecreated).getTime();
  return start - end;
};

const sortByName = (a: Task, b: Task) => {
  const start = new Date(b.datecreated).getTime();
  const end = new Date(a.datecreated).getTime();
  return end - start;
};
