import React, { FC, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { MAX_LENGTH } from 'constants/tests';
//Components
import Input from 'ui-kit/Input';
import { Wrapper } from './styled';

interface HeaderProps {
  name: string;
  isChangeName: boolean;
  children: React.ReactNode;
  onSubmitForm: (name: string) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

const Header: FC<HeaderProps> = ({
  name,
  isChangeName,
  onSubmitForm,
  children,
  dragHandleProps,
}: HeaderProps) => {
  const [value, setValue] = useState('');
  return (
    <Wrapper {...dragHandleProps}>
      {isChangeName ? (
        <form onSubmit={() => onSubmitForm(value)}>
          <Input
            placeholder={name}
            value={value}
            autoFocus
            onChange={(value) => setValue(value)}
          />
        </form>
      ) : (
        <p className="name">
          {name.length > MAX_LENGTH ? `${name.slice(0, MAX_LENGTH)}...` : name}
        </p>
      )}
      {children}
    </Wrapper>
  );
};

Header.displayName = 'Header';

export default Header;
