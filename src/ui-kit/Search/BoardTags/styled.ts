import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  top: 30px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 15px;
  background-color: ${({ theme }) => `${theme.colors.bgLight}`};
`;

export const Button = styled.button`
  margin: 5px;
  min-width: 70px;
  padding: 5px 10px;
  display: inline-flex;
  align-items: center;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: inset 0 2px 0 rgb(106 110 161 / 20%),
    0 0 4px rgb(189 189 189 / 20%);

  &:disabled {
    opacity: 0.5;
  }
`;

export const ButtonPlus = styled.img`
  margin-left: 10px;
  width: 10px;

  &.plus {
    transform: rotate(45deg);
  }
`;
