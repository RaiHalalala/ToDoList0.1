import React, { FC, useEffect, useState } from 'react';
import { actions, sorting, Base, Data, ID_MANE_LIST } from 'data/actions';
import { ChangingColumn, SortOptions } from '../type';
//Components
import ButtonIcon from 'ui-kit/ButtonIcon';
import { Wrapper, List, Name, Item } from './styled';

interface ActionsProps {
  position: { left: number; right: number };
  sortingState: SortOptions | null;
  sortColumn: (options: SortOptions) => void;
  closePopup: () => void;
  changeNameColumn: () => void;
  createNewTask: () => void;
  changeColumn: (value: ChangingColumn) => void;
}

const Actions: FC<ActionsProps> = ({
  position,
  sortingState,
  sortColumn,
  closePopup,
  changeNameColumn,
  createNewTask,
  changeColumn,
}: ActionsProps) => {
  const [list, setList] = useState<Data>(actions);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const width = window.outerWidth;
    setWidth(width);
  }, []);

  const setOtherList = (e: React.MouseEvent<HTMLElement>, list: Data) => {
    e.stopPropagation();
    setList(list);
  };
  const clearColumn = () => changeColumn(ChangingColumn.clear);
  const deleteColumn = () => changeColumn(ChangingColumn.delete);
  const startActive = (id: string, e: React.MouseEvent<HTMLElement>) => {
    switch (id) {
      case `0-${Base.action}`: {
        return changeNameColumn();
      }
      case `1-${Base.action}`: {
        return createNewTask();
      }
      case `2-${Base.action}`: {
        return setOtherList(e, sorting);
      }
      case `3-${Base.action}`: {
        return clearColumn();
      }
      case `4-${Base.action}`: {
        return deleteColumn();
      }
      case `1-${Base.sorting}`: {
        return sortColumn({
          key: 'datecreated',
          reverse: false,
          name: id,
        });
      }
      case `2-${Base.sorting}`: {
        return sortColumn({
          key: 'datecreated',
          reverse: true,
          name: id,
        });
      }
      case `3-${Base.sorting}`: {
        return sortColumn({
          key: 'name',
          reverse: false,
          name: id,
        });
      }
    }
  };
  const setActive = (name: string) =>
    Boolean(sortingState?.name && sortingState.name === name);

  return (
    <Wrapper onClick={closePopup}>
      <List
        position={position}
        isCloseEnding={Boolean(width && width - position.left < 250)}>
        <Name>
          {list.id !== ID_MANE_LIST && (
            <ButtonIcon
              className="arrow"
              onClick={(e) => setOtherList(e, actions)}
              attrIcon={{
                src: '/static/images/arrow-vertical.svg',
                alt: 'arrow',
                width: '6px',
              }}
            />
          )}
          <p className="title">{list.name}</p>
          <ButtonIcon
            className="button"
            onClick={closePopup}
            attrIcon={{
              src: '/static/images/close.png',
              alt: 'close',
              width: '10px',
            }}
          />
        </Name>
        {list.data.map(({ title, id, base }) => (
          <Item
            key={id}
            isActive={setActive(`${id}-${base}`)}
            onClick={(e) => startActive(`${id}-${base}`, e)}
            className={id === 3 ? 'indent' : ''}>
            {title}
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};

export default Actions;
