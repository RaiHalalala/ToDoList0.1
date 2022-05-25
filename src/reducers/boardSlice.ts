import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchBoards,
  fetchChangingBoard,
  fetchAddBoard,
  fetchAddGroupeOfTasks,
  fetchDeleteBoard,
} from 'api';
import { RootState } from 'store';
import { Board } from 'types/board';

export type BoardsState = {
  boards: Board[];
  error: boolean;
  loading: boolean;
};

const initialState: BoardsState = {
  boards: [],
  error: false,
  loading: false,
};

export const getUser = createAsyncThunk<void, void, { state: RootState }>(
  'getBoards',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await fetchBoards();
      if (data) {
        dispatch(setBoards(data));
      }
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const sendChangesBoards = createAsyncThunk<
  void,
  {
    id: number;
    params: { [key: string]: boolean } | Board;
  },
  { state: RootState }
>('sendChangesBoards', async ({ id, params }, { dispatch }) => {
  try {
    await fetchChangingBoard({
      id,
      params,
    });
  } catch (error) {
    dispatch(setError(true));
  }
});

export const addNewBoard = createAsyncThunk<void, Board, { state: RootState }>(
  'addNewBoard',
  async (params, { dispatch }) => {
    const groupeOfTasks = {
      boardId: params.id,
      categories: [],
      data: [],
    };
    try {
      await fetchAddBoard({
        params,
      });
      await fetchAddGroupeOfTasks({ params: groupeOfTasks });
    } catch (error) {
      dispatch(setError(true));
    }
  },
);

export const deleteBoard = createAsyncThunk<void, number, { state: RootState }>(
  'deleteBoard',
  async (boardID, { dispatch }) => {
    try {
      await fetchDeleteBoard({
        boardID,
      });
    } catch (error) {
      dispatch(setError(true));
    }
  },
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<Board[]>) {
      state.boards = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
  },
});

export const { setBoards, setLoading, setError } = boardsSlice.actions;
export default boardsSlice.reducer;
