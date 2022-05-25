import styled from '@emotion/styled';
import { setGradient } from 'utils/helper';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
`;

type ColorDisplayProps = {
  colors: string[];
};

export const ColorDisplay = styled.div<ColorDisplayProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: ${({ colors }) => setGradient(colors)};
  border-radius: 15px;
`;
