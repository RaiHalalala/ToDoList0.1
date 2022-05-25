import React, { FC, useEffect, useState } from 'react';
import { setFormatDate, toHtml } from 'utils/helper';
import { BUTTON_SAVE, IMAGE_DELETE } from 'constants/common';
import { DATE_FORMAT } from 'constants/tests';
import { useScreen } from 'hooks/useScreen';
import { COLORS } from 'constants/colors';
import { Board } from 'types/board';
import {
  DELETE_BOARD,
  ATTENTION_DELETE,
  PLACEHOLDER_NAME,
  PLACEHOLDER_DESCRIPTION,
} from 'constants/board';
//Components
import WrapperModal from 'ui-kit/WrapperModal';
import ColorPicker from 'ui-kit/ColorPicker';
import TextArea from 'ui-kit/TextArea';
import Button from 'ui-kit/Button';
import Input from 'ui-kit/Input';
import Attention from 'ui-kit/Attention';
import { LeftContent, Header, RightContent, Delete } from './styled';

interface PopupProps {
  id: number;
  initialData: Board;
  isNewCard?: boolean;
  onClose: () => void;
  setBoard: (values: Board) => void;
  deleteBoard?: (boardID: number) => void;
  //unique disabled for submit
  setDisabled: (newData: Board, prevData?: Board) => boolean;
}

const Popup: FC<PopupProps> = ({
  id,
  isNewCard,
  initialData,
  onClose,
  setBoard,
  setDisabled,
  deleteBoard,
}: PopupProps) => {
  const { isMobile } = useScreen();
  //values with data of board
  const [values, setValues] = useState<Board>(initialData);
  //attention before deleted board
  const [isAttention, setAttention] = useState(false);

  useEffect(() => {
    const colors = setInitialColors(values.colors);
    const datecreated = setDatecreated(isNewCard);
    setValues((prev) => ({
      ...prev,
      datecreated,
      id,
      colors,
    }));
  }, []);

  const setInitialColors = (colors: string[]) =>
    colors.length ? colors : [COLORS[0], COLORS[COLORS.length - 1]];

  const setDatecreated = (isNewCard?: boolean) =>
    isNewCard
      ? setFormatDate(new Date(), DATE_FORMAT)
      : initialData.datecreated;

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
    onClose();
  };

  const saveValues = () => {
    setBoard({ ...values, description: toHtml(values.description) });
  };

  const ButtonSave = (
    <Button
      type="button"
      className="submit"
      onClick={saveValues}
      disabled={setDisabled(values, initialData)}>
      {setDisabled(values, initialData)
        ? BUTTON_SAVE.disabled
        : BUTTON_SAVE.solve}
    </Button>
  );

  const DeletedButton = !isNewCard && (
    <Delete onClick={() => setAttention(true)}>
      <img {...IMAGE_DELETE} />
      {DELETE_BOARD}
    </Delete>
  );

  const AttentionPopup = isAttention && (
    <Attention onAgree={onAgree} onDisagree={() => setAttention(false)}>
      {ATTENTION_DELETE}
    </Attention>
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
          onChange={addName}
          placeholder={PLACEHOLDER_NAME}
        />
        <TextArea
          className="form-item"
          value={values.description}
          onChange={addDescription}
          placeholder={PLACEHOLDER_DESCRIPTION}
        />
        {!isMobile && ButtonSave}
      </LeftContent>
      <RightContent className="scroll">
        <ColorPicker
          initialColors={COLORS}
          className="color-picker"
          width={isMobile ? 90 : 140}
          firstColor={values.colors[0] || COLORS[0]}
          secondColor={values.colors[1] || COLORS[COLORS.length - 1]}
          setData={addColors}
        />
        {isMobile && ButtonSave}
        {DeletedButton}
      </RightContent>
      {AttentionPopup}
    </WrapperModal>
  );
};

export default Popup;
