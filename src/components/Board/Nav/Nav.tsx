import { FC } from 'react';
import Button from 'ui-kit/Button';
import { NavTab } from './styled';

interface NavProps {
  addNewCard: () => void;
}

const Nav: FC<NavProps> = ({ addNewCard }: NavProps) => (
  <NavTab>
    <h2>Boards</h2>
    <Button onClick={addNewCard} className="button">
      Add New Card
    </Button>
  </NavTab>
);

export default Nav;
