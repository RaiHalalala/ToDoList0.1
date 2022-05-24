import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks, fetchChangingTasks } from 'api';
import { RootState } from 'store';
import { Task, DataTask, Category } from 'types/task';

export type TasksState = {
  tasksID: number | null;
  categories: Category[];
  tasks: Task[];
  tags: string[];
  error: boolean;
  loading: boolean;
};

const initialState: TasksState = {
  tasksID: null,
  categories: [],
  tasks: [],
  tags: [],
  error: false,
  loading: false,
};

export const getTasks = createAsyncThunk<void, number, { state: RootState }>(
  'getTasks',
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await fetchTasks(id);
      if (response) {
        dispatch(setTasks(response[0]));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const sendChanges = createAsyncThunk<
  void,
  { [key: string]: Category[] | Task[] | string[] },
  { state: RootState }
>('sendChanges', async (params, { dispatch, getState }) => {
  const { tasks } = getState();
  try {
    await fetchChangingTasks({
      id: Number(tasks.tasksID),
      params,
    });
  } catch (error) {
    dispatch(setError(true));
  }
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<DataTask>) {
      state.tasks = [...action.payload.data].sort((x, y) => {
        if (x.order < y.order) return -1;
        if (x.order > y.order) return 1;
        return 0;
      });
      state.tasksID = action.payload.id;
      state.categories = action.payload.categories;
      state.tags = action.payload.tags;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
  },
});

export const { setTasks, setLoading, setError } = tasksSlice.actions;
export default tasksSlice.reducer;
