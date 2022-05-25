import React, { FC } from 'react';
import { Button, Image, AttrImage } from './styled';
interface ButtonIconProps {
  className?: string;
  attrIcon: AttrImage;
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
