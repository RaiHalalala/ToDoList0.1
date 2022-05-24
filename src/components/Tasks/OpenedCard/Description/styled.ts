import styled from '@emotion/styled';

type WrapperProps = {
  isNewDesc: boolean;
};

export const Wrapper = styled.li<WrapperProps>`
  position: relative;
  margin-top: 4px;
  padding: 10px;
  width: 100%;
  white-space: pre-line;
  word-wrap: break-word;
  background: ${({ theme, isNewDesc }) =>
    isNewDesc ? theme.colors.primary : theme.colors.background}69;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fonts.s};
  ${({ theme, isNewDesc }) =>
    isNewDesc ? `color: ${theme.colors.secondary};` : ''}

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

export const ButtonDelete = styled.button`
  position: absolute;
  top: -9px;
  right: -10px;
  height: 23px;
  width: 23px;
  padding: 6px;
  background: ${({ theme }) => theme.colors.bgLight};
  border-radius: 50%;

  & > .close {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
