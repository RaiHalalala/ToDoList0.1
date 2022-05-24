import React, { FC, useEffect, useState } from 'react';
import { DELETE_BOARD, ATTENTION_DELETE } from 'constants/board';
import { setFormatDate, toHtml } from 'utils/helper';
import { BUTTON_SAVE } from 'constants/common';
import { DATE_FORMAT } from 'constants/tests';
import { useScreen } from 'hooks/useScreen';
import { COLORS } from 'constants/colors';
import { Board } from 'types/board';
//Components
import WrapperModal from 'ui-kit/WrapperModal';
import ColorPicker from 'ui-kit/ColorPicker';
import TextArea from 'ui-kit/TextArea';
import Button from 'ui-kit/Button';
import Input from 'ui-kit/Input';
import Attention from 'ui-kit/Attention';
import { LeftContent, Header, RightContent, Delete } from './styled';

interface NewCardProps {
  id: number;
  initialData: Board;
  isNewCard?: boolean;
  onClose: () => void;
  setBoard: (values: Board) => void;
  deleteBoard?: (boardID: number) => void;
  setDisabled: (newData: Board, prevData?: Board) => boolean;
}

const NewCard: FC<NewCardProps> = ({
  id,
  isNewCard,
  initialData,
  onClose,
  setBoard,
  setDisabled,
  deleteBoard,
}: NewCardProps) => {
  const { isMobile } = useScreen();
  const [values, setValues] = useState<Board>(initialData);
  const [isAttention, setAttention] = useState(false);

  useEffect(() => {
    const colors = values.colors.length
      ? values.colors
      : [COLORS[0], COLORS[COLORS.length - 1]];
    setValues((prev) => ({
      ...prev,
      datecreated: setDatecreated(isNewCard),
      id,
      colors,
    }));
  }, []);

  const setDatecreated = (isNewCard?: boolean) =>
    isNewCard
      ? setFormatDate(new Date(), DATE_FORMAT)
      : initialData.datecreated;

  const saveNewCard = () => {
    setBoard({ ...values, description: toHtml(values.description) });
  };

  const addName = (value: string) => {
    setValues((prev) => ({ ...prev, name: value || '' }));
  };

  const addDescription = (value: string) => {
    setValues((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const addColors = (colors: string[]) => {
    setValues((prev) => ({
      ...prev,
      colors,
    }));
  };

  const onAgree = () => {
    deleteBoard && deleteBoard(id);
    onClose && onClose();
  };

  const ButtonSave = (
    <Button
      type="button"
      onClick={saveNewCard}
      disabled={setDisabled(values, initialData)}
      className="submit">
      {setDisabled(values, initialData)
        ? BUTTON_SAVE.disabled
        : BUTTON_SAVE.solve}
    </Button>
  );

  return (
    <WrapperModal onClose={onClose}>
      <LeftContent>
        <Header>
          <h3 className="name">New Board</h3>
          <p>{values.datecreated}</p>
        </Header>

        <Input
          className="form-item"
          value={values.name}
          placeholder="add a name for the card"
          onChange={addName}
        />
        <TextArea
          className="form-item"
          value={values.description}
          placeholder="add a description for the card"
          onChange={addDescription}
        />

        {!isMobile && ButtonSave}
      </LeftContent>
      <RightContent className="scroll">
        <ColorPicker
          width={isMobile ? 90 : 140}
          className="color-picker"
          initialColors={COLORS}
          firstColor={values.colors[0] || COLORS[0]}
          secondColor={values.colors[1] || COLORS[COLORS.length - 1]}
          setData={addColors}
        />
        {isMobile && ButtonSave}
        {!isNewCard && (
          <Delete onClick={() => setAttention(true)}>
            <img
              className="icon"
              src="/static/images/delete.png"
              alt="delete"
            />
            {DELETE_BOARD}
          </Delete>
        )}
      </RightContent>
      {isAttention && (
        <Attention onAgree={onAgree} onDisagree={() => setAttention(false)}>
          {ATTENTION_DELETE}
        </Attention>
      )}
    </WrapperModal>
  );
};

export default NewCard;
