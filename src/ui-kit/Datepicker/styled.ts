import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  &:not(:first-of-type) {
    margin-top: 10px;
  }

  & > .header {
    margin: 5px 0 10px;
    width: 50%;
  }

  @media (${({ theme }) => theme.breakpoints.xs}) {
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
`;
