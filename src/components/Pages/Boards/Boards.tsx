import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUser,
  BoardsState,
  sendChangesBoards,
  addNewBoard,
  deleteBoard,
} from 'reducers/boardSlice';
import { RootState } from 'store';
import BoardContent from 'components/Board';
import Loading from 'components/Loading';
import { Board } from 'types/board';

const Boards = () => {
  const dispatch = useDispatch();
  const { boards, loading } = useSelector<RootState, BoardsState>(
    ({ boards }) => boards,
  );
  useEffect(() => {
    //getting data of boards when we stay in main page ('/')
    dispatch(getUser());
  }, []);
  const setFavorite = (id: number, is_favorite: boolean) =>
    dispatch(sendChangesBoards({ id, params: { is_favorite } }));

  const saveChanges = (values: Board) =>
    dispatch(sendChangesBoards({ id: values.id, params: values }));

  const saveNewBoard = (values: Board) => dispatch(addNewBoard(values));

  const sendDeletedBoard = (boardID: number) => dispatch(deleteBoard(boardID));

  if (loading) {
    return <Loading />;
  }
  return (
    <BoardContent
      boards={boards}
      setFavorite={setFavorite}
      saveChanges={saveChanges}
      saveNewBoard={saveNewBoard}
      sendDeletedBoard={sendDeletedBoard}
    />
  );
};

export default Boards;
