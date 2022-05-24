import { Dispatch, Middleware } from 'redux';
import { saveState } from 'utils/localStorage';
import { KEY_MODE } from 'constants/names';

export const localStorageMiddleware: Middleware =
  () => (next: Dispatch) => (action) => {
    if (action.type === 'app/setMode') {
      saveState(action.payload, KEY_MODE);
    }

    return next(action);
  };
