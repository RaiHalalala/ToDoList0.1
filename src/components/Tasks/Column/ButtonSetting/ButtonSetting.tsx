import React, { FC } from 'react';
//Components
import { Points } from './styled';

interface ButtonSettingProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const ButtonSetting: FC<ButtonSettingProps> = ({
  onClick,
}: ButtonSettingProps) => (
  <button onClick={onClick}>
    {Array.from({ length: 3 }).map((_, index) => (
      <Points key={index} />
    ))}
  </button>
);

export default ButtonSetting;
