import { ThemeButton } from '.';
import styled from '@emotion/styled';

type ButtonStyleProps = {
  themeButton: ThemeButton;
};

export const ButtonStyle = styled.button<ButtonStyleProps>`
  position: relative;
  padding: 8px 12px;
  min-width: 100px;
  border-radius: 10px;
  background: ${({ theme, themeButton }) =>
    themeButton !== ThemeButton.secondary
      ? theme.colors[themeButton]
      : 'transparent'};
  color: ${({ theme, themeButton }) =>
    themeButton === ThemeButton.secondary ? theme.colors.secondary : '#fff'};
  border: ${({ theme, themeButton }) =>
    themeButton === ThemeButton.secondary
      ? `1px solid ${theme.colors.secondary}`
      : 'none'};

  & :hover {
    background: ${({ theme, themeButton }) =>
      themeButton !== ThemeButton.secondary
        ? theme.colors[themeButton]
        : 'transparent'};
  }
  &:focus,
  :active {
    background: ${({ theme }) => theme.colors.accent};
  }
  &:disabled {
    opacity: 0.5;
  }

  &::after,
  ::before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border-radius: 13px;
    transition: 0.3s;
  }
  &::after {
    top: -4px;
    left: -4px;
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
  }
  &::before {
    bottom: -4px;
    right: -4px;
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;
  }
  &:hover::after,
  &:hover::before {
    width: calc(100% + 7px);
    height: calc(100% + 7px);
    border-color: ${({ theme, themeButton }) =>
      themeButton === ThemeButton.secondary
        ? theme.colors.secondary
        : theme.colors.primary};
  }
  &:focus::after,
  :active::after,
  &:focus::before,
  :active::before {
    width: calc(100% + 7px);
    height: calc(100% + 7px);
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;
