import React, { FC } from 'react';
import { actions, Data } from 'data/actions';
//Components
import ButtonIcon from 'ui-kit/ButtonIcon';
import { Header } from './styled';

interface ActionsProps {
  name: string;
  isMainList: boolean;
  closePopup: () => void;
  setList: (list: Data) => void;
}

const Actions: FC<ActionsProps> = ({
  name,
  setList,
  isMainList,
  closePopup,
}: ActionsProps) => {
  const setOtherList = (e: React.MouseEvent<HTMLElement>, list: Data) => {
    e.stopPropagation();
    setList(list);
  };

  const ArrowComponent = isMainList && (
    <ButtonIcon
      className="arrow"
      onClick={(e) => setOtherList(e, actions)}
      attrIcon={{
        src: '/static/images/arrow-vertical.svg',
        alt: 'arrow',
        width: '6px',
      }}
    />
  );

  return (
    <Header>
      {ArrowComponent}
      <p className="title">{name}</p>
      <ButtonIcon
        className="button"
        onClick={closePopup}
        attrIcon={{
          src: '/static/images/close.png',
          alt: 'close',
          width: '10px',
        }}
      />
    </Header>
  );
};

export default Actions;
