import styled from '@emotion/styled';

export const Label = styled.label`
  display: block;
  width: 100%;
  height: 90px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
`;

export const TextAreaStyle = styled.textarea`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 10px;
  background: transparent;
  border: 0;
  border-radius: inherit;
`;
