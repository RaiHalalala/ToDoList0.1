import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Mode = 'light' | 'dark';

export type AppState = {
  mode: Mode;
};

const initialState: AppState = {
  mode: 'light',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = appSlice.actions;
export default appSlice.reducer;
