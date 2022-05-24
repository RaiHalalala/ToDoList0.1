import React, { FC, useState } from 'react';
import { BlockPicker } from 'react-color';
import styled from '@emotion/styled';
import { setGradient } from 'utils/helper';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
`;

type ColorDisplayProps = {
  colors: string[];
};

const ColorDisplay = styled.div<ColorDisplayProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: ${({ colors }) => setGradient(colors)};
  border-radius: 15px;
`;

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
  setData,
  initialColors,
  firstColor,
  secondColor,
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
      <BlockPicker
        color={colors.first}
        width={`${width || 140}px`}
        className={className}
        colors={initialColors}
        onChange={(color) => {
          saveDataColors('first', color.hex);
        }}
      />
      <BlockPicker
        color={colors.second}
        width={`${width || 140}px`}
        className={className}
        colors={initialColors}
        onChange={(color) => {
          saveDataColors('second', color.hex);
        }}
      />
    </Wrapper>
  );
};

export default ColorPicker;
