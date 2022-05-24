export const loadState = (name: string) => {
  try {
    const serializedState = localStorage.getItem(name);

    return serializedState ? JSON.parse(serializedState) : null;
  } catch (err) {
    return null;
  }
};

export const saveState = <T>(state: T, name: string) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
  } catch {
    // ignore write errors
  }
};

export const removeState = (name: string) => {
  localStorage.removeItem(name);
};
