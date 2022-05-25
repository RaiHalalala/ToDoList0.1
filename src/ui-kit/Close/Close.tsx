import React, { FC } from 'react';
import { IMAGE_CLOSE } from 'constants/common';
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

const Close: FC<CloseProps> = ({ onClick, className }: CloseProps) => (
  <Button onClick={onClick} className={className}>
    <img {...IMAGE_CLOSE} />
  </Button>
);

export default Close;
