import { Task } from 'types/task';

export interface Columns {
  [key: string]: Value;
}

export type Value = { name: string; categories_id: number; tasks: Task[] };

export enum DropName {
  item = 'droppableItem',
  subItem = 'droppableSubItem',
}

export type ID = {
  sourceKey: string;
  destKey: string;
  sourceIndex: number;
};

export type InitialValues = {
  category_id: number;
  order: number;
  id?: number;
};

export enum ChangingColumn {
  delete = 'delete',
  clear = 'clear',
}

export type Filter = {
  [param in FilterParam]: FilterValue;
};

export type FilterParam = 'tags';
export type FilterValue = { value: string; active: boolean };

export const initialFilter: Filter = {
  tags: { value: '', active: true },
};

export type SortOptions = {
  key: string;
  reverse: boolean;
  name: string;
};

export type Attention = {
  base: ChangingColumn;
  category_id: number;
  title: string;
};

export type NewID = {
  column: number;
  task: number;
};
