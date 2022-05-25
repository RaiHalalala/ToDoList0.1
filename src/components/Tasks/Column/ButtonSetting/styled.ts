import styled from '@emotion/styled';

export const Points = styled.div`
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.secondary};
  &:not(:last-of-type) {
    margin-bottom: 3px;
  }
`;
