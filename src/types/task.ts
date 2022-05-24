export interface Task {
  isActive?: boolean;
  category_id?: number;
  id: number;
  order: number;
  name: string;
  tags: string[];
  descriptions: Description[];
  favorite: boolean;
  datecreated: string;
  deadline: string;
  members: number[];
  icon: string | null;
}

export interface Category {
  id: number;
  name: string;
  order: number;
}

export interface Description {
  id: number;
  title: string;
}

export interface DataTask {
  id: number;
  boardId: number;
  categories: Category[];
  tags: string[];
  data: Task[];
}
