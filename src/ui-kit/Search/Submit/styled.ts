import styled from '@emotion/styled';

export const SubmitStyle = styled.button`
  margin-left: 10px;
  padding: 7px 10px;
  height: fit-content;
  border-radius: 15px;
  box-shadow: 0 2px 0 rgb(106 110 161 / 20%), 0 0 4px rgb(189 189 189 / 20%);

  &:disabled {
    opacity: 0.6;
  }
`;
