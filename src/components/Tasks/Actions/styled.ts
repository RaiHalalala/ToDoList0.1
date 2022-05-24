import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  @media (${({ theme }) => theme.breakpoints.xs}) {
    backdrop-filter: blur(2px);
  }
`;

type ListProps = {
  position: { left: number; right: number };
  isCloseEnding: boolean;
};

export const List = styled.div<ListProps>`
  position: fixed;
  z-index: 1;
  top: 135px;
  left: ${({ position: { left }, isCloseEnding }) =>
    isCloseEnding ? left - 230 : left}px;
  width: 230px;
  background: ${({ theme }) => theme.colors.bgLight};
  padding-bottom: 10px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.dark};

  @media (${({ theme }) => theme.breakpoints.xs}) {
    position: absolute;
    left: 10px;
    right: 10px;
    width: auto;
  }
`;

export const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  text-align: center;

  & > .title {
    width: 100%;
    text-align: center;
  }

  & > .arrow {
    justify-content: flex-end;
    transform: rotate(180deg);
  }
`;

type ItemProps = {
  isActive: boolean;
};

export const Item = styled.button<ItemProps>`
  width: 100%;
  padding: 8px 10px;
  text-align: left;
  font-size: ${({ theme }) => theme.fonts.s};
  font-weight: bold;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.text};
  ${({ theme, isActive }) =>
    isActive ? `background: ${theme.colors.primary}30;` : ''}

  &.indent {
    margin-top: 15px;
  }

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}30`};
  }
`;
