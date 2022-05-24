import { FC, useState } from 'react';
import { Filter as FilterType } from '../type';
//Components
import Button, { ThemeButton } from 'ui-kit/Button';
import Filter from 'ui-kit/Filter';
import Arrow from 'ui-kit/Arrow';
import { NavTab } from './styled';

interface NavProps {
  addNewColumn: () => void;
  filtering: FilterType;
  changeFiltering: (param: FilterType) => void;
}

const Nav: FC<NavProps> = ({
  addNewColumn,
  filtering,
  changeFiltering,
}: NavProps) => {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  return (
    <NavTab>
      <Button className="button" to="/" themeButton={ThemeButton.secondary}>
        <img
          className="arrow"
          src="/static/images/arrow-light.png"
          alt="arrow"
        />
        Prev page
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
