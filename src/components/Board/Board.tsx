import { FC, useState } from 'react';
import { Board } from 'types/board';
import { INITIAL_NEW_CARD } from 'constants/board';
import { maxNumber, deepEqual } from 'utils/helper';
//Components
import Popup from './Popup';
import Card from './Card';
import Nav from './Nav';
import { Block } from './styled';

interface BoardsProps {
  boards: Board[];
  setFavorite: (id: number, is_favorite: boolean) => void;
  saveChanges: (values: Board) => void;
  saveNewBoard: (values: Board) => void;
  sendDeletedBoard: (boardID: number) => void;
}

type PopupType = {
  createdNewBoard: boolean;
  changedOldBoard: Board | null;
};

const Boards: FC<BoardsProps> = ({
  boards,
  setFavorite,
  saveChanges,
  saveNewBoard,
  sendDeletedBoard,
}: BoardsProps) => {
  const [data, setData] = useState(boards);
  const [openPopup, setOpenPopup] = useState<PopupType>({
    createdNewBoard: false,
    changedOldBoard: null,
  });

  const createNewBoard = (values: Board) => {
    saveNewBoard(values);
    setData((prev) => [...prev, values]);
    setOpenPopup((prev) => ({ ...prev, createdNewBoard: false }));
  };

  const changeOldBoard = (values: Board) => {
    saveChanges(values);
    setData((prev) =>
      prev.map((board) => (board.id === values.id ? values : board)),
    );
    setOpenPopup((prev) => ({ ...prev, changedOldBoard: null }));
  };

  const deleteBoard = (boardID: number) => {
    setData((prev) => prev.filter(({ id }) => id !== boardID));
    sendDeletedBoard(boardID);
  };

  const addNewBoard = () =>
    setOpenPopup((prev) => ({ ...prev, createdNewBoard: true }));

  const selectBoard = (changedOldBoard: Board) =>
    setOpenPopup((prev) => ({ ...prev, changedOldBoard }));

  //popup with functional of creating the new board
  const CratedNewBoard = openPopup.createdNewBoard && (
    <Popup
      isNewCard
      id={maxNumber(data.map(({ id }) => id))}
      setBoard={createNewBoard}
      initialData={INITIAL_NEW_CARD}
      setDisabled={(newData: Board) => !newData.name}
      onClose={() =>
        setOpenPopup((prev) => ({ ...prev, createdNewBoard: false }))
      }
    />
  );
  //popup with functional of changing the board
  const ChangedOldBoard = openPopup.changedOldBoard && (
    <Popup
      id={openPopup.changedOldBoard.id}
      setBoard={changeOldBoard}
      initialData={openPopup.changedOldBoard}
      deleteBoard={deleteBoard}
      setDisabled={(newData: Board, prevData?: Board) =>
        deepEqual(prevData, newData)
      }
      onClose={() =>
        setOpenPopup((prev) => ({ ...prev, changedOldBoard: null }))
      }
    />
  );

  return (
    <>
      <Nav addNewBoard={addNewBoard} />
      <Block className="scroll">
        {data.map((params) => (
          <Card
            {...params}
            key={params.id}
            setFavoriteBoard={setFavorite}
            selectBoard={() => selectBoard(params)}
          />
        ))}
      </Block>
      {CratedNewBoard}
      {ChangedOldBoard}
    </>
  );
};

export default Boards;
