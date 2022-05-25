import React, { FC, useEffect, useState } from 'react';
import { actions, sorting, Base, Data, ID_MANE_LIST } from 'data/actions';
import { ChangingColumn, SortOptions } from '../type';
//Components
import Header from './Header';
import { Wrapper, List, Item } from './styled';

interface ActionsProps {
  sortingState: SortOptions | null;
  position: { left: number; right: number };
  closePopup: () => void;
  createNewTask: () => void;
  changeNameColumn: () => void;
  sortColumn: (options: SortOptions) => void;
  changeColumn: (value: ChangingColumn) => void;
}

const Actions: FC<ActionsProps> = ({
  position,
  sortColumn,
  closePopup,
  changeColumn,
  sortingState,
  createNewTask,
  changeNameColumn,
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
    //depending on 'id + base' from list.data call a function
    switch (id) {
      case `0-${Base.action}`: {
        return changeNameColumn();
      }
      case `1-${Base.action}`: {
        return createNewTask();
      }
      case `2-${Base.action}`: {
        //open an other list with sorting functions
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
        <Header
          name={list.name}
          closePopup={closePopup}
          isMainList={list.id === ID_MANE_LIST}
          setList={(list: Data) => setList(list)}
        />
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
