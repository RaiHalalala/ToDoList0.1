import { FC, useState } from 'react';
import { Board } from 'types/board';
import { INITIAL_NEW_CARD } from 'constants/board';
import { maxNumber, deepEqual } from 'utils/helper';
//Components
import OpenCard from './OpenCard';
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

const Boards: FC<BoardsProps> = ({
  boards,
  setFavorite,
  saveChanges,
  saveNewBoard,
  sendDeletedBoard,
}: BoardsProps) => {
  const [data, setData] = useState(boards);
  const [isNewCard, setNewCard] = useState(false);
  const [openBoard, setOpenBoard] = useState<Board | null>(null);

  const setBoard = (values: Board, isNewTask?: boolean) => {
    if (isNewTask) {
      saveNewBoard(values);
      setData((prev) => [...prev, values]);
      setNewCard(false);
      return;
    }
    saveChanges(values);
    setData((prev) =>
      prev.map((board) => (board.id === values.id ? values : board)),
    );
    setOpenBoard(null);
  };

  const deleteBoard = (boardID: number) => {
    setData((prev) => prev.filter(({ id }) => id !== boardID));
    sendDeletedBoard(boardID);
  };

  return (
    <>
      <Nav addNewCard={() => setNewCard((prev) => (!prev ? true : prev))} />
      <Block className="scroll">
        {data.map((params) => (
          <Card
            key={params.id}
            setFavorite={setFavorite}
            selectCard={() => setOpenBoard(params)}
            {...params}
          />
        ))}
      </Block>
      {isNewCard && (
        <OpenCard
          isNewCard
          id={maxNumber(data.map(({ id }) => id))}
          setBoard={(value: Board) => setBoard(value, true)}
          initialData={INITIAL_NEW_CARD}
          setDisabled={(newData: Board) => !newData.name}
          onClose={() => setNewCard(false)}
        />
      )}
      {openBoard && (
        <OpenCard
          id={openBoard.id}
          setBoard={setBoard}
          initialData={openBoard}
          setDisabled={(newData: Board, prevData?: Board) =>
            deepEqual(prevData, newData)
          }
          deleteBoard={deleteBoard}
          onClose={() => setOpenBoard(null)}
        />
      )}
    </>
  );
};

export default Boards;
