import { FC } from 'react';
import { MAIN_NAME, BUTTON_ADD } from 'constants/board';
//Components
import Button from 'ui-kit/Button';
import { NavTab } from './styled';

interface NavProps {
  addNewBoard: () => void;
}

const Nav: FC<NavProps> = ({ addNewBoard }: NavProps) => (
  <NavTab>
    <h2>{MAIN_NAME}</h2>
    <Button onClick={addNewBoard} className="button">
      {BUTTON_ADD}
    </Button>
  </NavTab>
);

export default Nav;
