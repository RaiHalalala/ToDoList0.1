import styled from '@emotion/styled';

export const NavTab = styled.nav`
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 55px;

  & > .button {
    margin-left: auto;
  }

  @media (${({ theme }) => theme.breakpoints.xs}) {
    justify-content: space-between;
    align-items: center;
    & > .button {
      margin: 0;
    }
  }
`;
