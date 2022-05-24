import styled from '@emotion/styled';

export const Block = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;

  @media (${({ theme }) => theme.breakpoints.xs}) {
    margin-top: unset;
    flex-direction: column;
    overflow-y: scroll;
    height: calc(100% - 55px);
    padding: 10px 20px;
    flex-wrap: nowrap;
  }
`;
