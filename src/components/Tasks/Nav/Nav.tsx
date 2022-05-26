import { FC, useState } from 'react';
import { Filter as FilterType } from '../type';
import { IMAGE_ARROW_LIGHT } from 'constants/common';
import { BUTTON_PREV } from 'constants/tests';
//Components
import Button, { ThemeButton } from 'ui-kit/Button';
import Filter from 'ui-kit/Filter';
import Arrow from 'ui-kit/Arrow';
import { NavTab } from './styled';

interface NavProps {
  filtering: FilterType;
  addNewColumn: () => void;
  changeFiltering: (param: FilterType) => void;
}

const Nav: FC<NavProps> = ({
  filtering,
  addNewColumn,
  changeFiltering,
}: NavProps) => {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  return (
    <NavTab>
      <Button
        className="button"
        to="/boards"
        themeButton={ThemeButton.secondary}>
        <img {...IMAGE_ARROW_LIGHT} />
        {BUTTON_PREV}
      </Button>
      <Arrow
        isShow={!isOpenFilters}
        onClick={() => setIsOpenFilters((prev) => !prev)}
        position="horizontal"
        className="arrow-in-mobile"
      />
      <Button onClick={addNewColumn}>Add New Column</Button>
      {isOpenFilters && (
        <Filter
          param={filtering}
          changeParam={changeFiltering}
          className="filter"
        />
      )}
    </NavTab>
  );
};

export default Nav;
