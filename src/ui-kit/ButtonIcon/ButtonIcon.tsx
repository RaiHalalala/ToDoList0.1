import React, { FC } from 'react';
import styled from '@emotion/styled';

type AttrImage = {
  src: string;
  alt: string;
  width: string;
  className?: string;
};

const Button = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img<AttrImage>`
  width: ${({ width }) => width};
`;

interface ButtonIconProps {
  attrIcon: AttrImage;
  className?: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const ButtonIcon: FC<ButtonIconProps> = ({
  attrIcon,
  className,
  onClick,
}: ButtonIconProps) => (
  <Button className={className} onClick={onClick}>
    <Image {...attrIcon} />
  </Button>
);

export default ButtonIcon;
