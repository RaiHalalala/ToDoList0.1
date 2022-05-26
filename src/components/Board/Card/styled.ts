import { Link } from 'react-router-dom';
import { setDark, setGradient } from 'utils/helper';
import styled from '@emotion/styled';

type BlockProps = {
  colors: string[];
};

export const Block = styled.div<BlockProps>`
  position: relative;
  margin: 0 20px 20px 0;
  height: 100px;
  width: 200px;
  min-width: 200px;
  background: ${({ colors }) => setGradient(colors)};
  box-shadow: ${({ colors }) => `0px 0px 20px 0px ${colors[1]}`};
  border-radius: 10px;

  @media (${({ theme }) => theme.breakpoints.xs}) {
    margin: 10px 0;
    width: 100%;
    height: 85px;
  }

  &:hover {
    background: ${({ colors }) => setGradient(colors, setDark)};
    box-shadow: ${({ colors }) => `0px 0px 20px 0px ${setDark(colors[1])}`};
  }
`;

export const LinkContainer = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 10px;
  text-decoration: auto;
`;

export const Name = styled.p`
  margin-bottom: 6px;
  font-weight: bold;
  color: #fff;
`;

export const Description = styled.p`
  height: 30px;
  width: 100%;
  overflow: hidden;
  color: #fff;
  font-size: ${({ theme }) => theme.fonts.xs};

  @media (${({ theme }) => theme.breakpoints.xs}) {
    height: 15px;
  }
`;

export const Bottom = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  color: #fff;
`;

export const Buttons = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 36px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
  padding: 10px 0;

  & > .change {
    width: 27px;
    height: 27px;
  }

  & > .star > .icon {
    width: 15px;
  }
`;

export const animationFavorite = (isHovered: boolean) => ({
  opacity: isHovered ? 1 : 0,
  x: isHovered ? 0 : 20,
});

export const initialStateFavorite = {
  x: 0,
  opacity: 1,
};
