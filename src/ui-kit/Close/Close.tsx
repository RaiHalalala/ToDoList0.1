import React, { FC } from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;

  & > .icon {
    width: 100%;
    height: 100%;
  }
`;

interface CloseProps {
  onClick: () => void;
  className?: string;
}

const Close: FC<CloseProps> = ({ onClick, className }: CloseProps) => {
  return (
    <Button onClick={onClick} className={className}>
      <img src="/static/images/close.png" alt="close" className="icon" />
    </Button>
  );
};

export default Close;
