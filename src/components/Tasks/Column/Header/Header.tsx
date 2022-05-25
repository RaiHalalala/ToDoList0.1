import React, { FC, useState } from 'react';
import { DraggableProvidedDragHandleProps as DragHandleType } from 'react-beautiful-dnd';
import { MAX_LENGTH } from 'constants/tests';
//Components
import Input from 'ui-kit/Input';
import { Wrapper } from './styled';

interface HeaderProps {
  name: string;
  isChangeName: boolean;
  children: React.ReactNode;
  dragHandleProps?: DragHandleType;
  onSubmitForm: (name: string) => void;
}

const Header: FC<HeaderProps> = ({
  name,
  isChangeName,
  onSubmitForm,
  children,
  dragHandleProps,
}: HeaderProps) => {
  const [value, setValue] = useState('');

  const FormComponent = isChangeName && (
    <form onSubmit={() => onSubmitForm(value)}>
      <Input
        placeholder={name}
        value={value}
        autoFocus
        onChange={(value) => setValue(value)}
      />
    </form>
  );
  const NameComponent = !isChangeName && (
    <p className="name">
      {name.length > MAX_LENGTH ? `${name.slice(0, MAX_LENGTH)}...` : name}
    </p>
  );
  return (
    <Wrapper {...dragHandleProps}>
      {FormComponent}
      {NameComponent}
      {children}
    </Wrapper>
  );
};

Header.displayName = 'Header';

export default Header;
