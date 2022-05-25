import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setMode } from 'reducers/appSlice';
import { RootState } from 'store';
import { loadState } from 'utils/localStorage';
import { KEY_MODE } from 'constants/names';

//performs mode setting from the Local storage (light or dark)
export const useInitialApp = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector<RootState, AppState>(({ app }) => app);
  useEffect(() => {
    const modeFromLS = loadState(KEY_MODE);
    if (modeFromLS && modeFromLS !== mode) {
      dispatch(setMode(modeFromLS));
    }
  }, []);
};
