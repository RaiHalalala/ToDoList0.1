import styled from '@emotion/styled';

export const Label = styled.label`
  position: relative;
  display: flex;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  box-shadow: inset 0 2px 0 rgb(106 110 161 / 20%),
    0 0 4px rgb(189 189 189 / 20%);
`;

export const InputStyle = styled.input`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 10px;
  background: transparent;
  border: 0;
  border-radius: inherit;
  outline: none;
  &:focus-visible,
  :focus {
    box-shadow: inset 0 2px 0 rgb(166 7 7 / 40%), 0 0 4px rgb(240 44 44 / 70%);
  }
`;

export const IconButton = styled.button`
  position: absolute;
  padding: 0;
  right: 15px;
  top: 30%;
`;
