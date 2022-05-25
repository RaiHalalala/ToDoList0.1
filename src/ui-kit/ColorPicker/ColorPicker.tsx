import React, { FC, useState } from 'react';
import { BlockPicker } from 'react-color';
import { Wrapper, ColorDisplay } from './styled';

interface ColorPicker {
  width?: number;
  className?: string;
  initialColors: string[];
  firstColor: string;
  secondColor: string;
  setData: (colors: string[]) => void;
}
type Colors = {
  first: string;
  second: string;
};

const ColorPicker: FC<ColorPicker> = ({
  width,
  className,
  firstColor,
  secondColor,
  initialColors,
  setData,
}: ColorPicker) => {
  const [colors, setColors] = useState<Colors>({
    first: firstColor,
    second: secondColor,
  });
  const saveDataColors = (key: string, color: string) => {
    const setNewColors = (values: Colors) => ({ ...values, [key]: color });
    setColors((prev) => setNewColors(prev));
    setData(Object.values(setNewColors(colors)));
  };
  return (
    <Wrapper>
      <ColorDisplay colors={Object.values(colors)}></ColorDisplay>
      {Object.entries(colors).map(([key, color], index) => (
        <BlockPicker
          key={index}
          color={color}
          className={className}
          colors={initialColors}
          width={`${width || 140}px`}
          onChange={(color) => {
            saveDataColors(key, color.hex);
          }}
        />
      ))}
    </Wrapper>
  );
};

export default ColorPicker;
