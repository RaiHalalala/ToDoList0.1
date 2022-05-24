import styled from '@emotion/styled';

export const Block = styled.div`
  display: flex;
  padding: 15px 0px;
  width: 100%;
  height: calc(100% - 51px);
  overflow-x: scroll;

  @media (${({ theme }) => theme.breakpoints.xs}) {
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: none;
    padding-right: 10px;
  }
`;
