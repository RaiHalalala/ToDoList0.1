import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { localStorageMiddleware as ls } from 'store/middleware/localStorage';
import appReducer from 'reducers/appSlice';
import mackrotasksSlice from 'reducers/boardSlice';
import tasksSlice from 'reducers/tasksSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    boards: mackrotasksSlice,
    tasks: tasksSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ls),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
