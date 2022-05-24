import styled from '@emotion/styled';

export const NavTab = styled.nav`
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  display: inline-flex;
  width: 100%;
  height: 55px;

  & > .button {
    margin: 0 10px;
  }

  & > .arrow-in-mobile {
    height: 15px;
    display: none;
  }

  & > .button > .arrow {
    margin-right: 10px;
    height: 10px;
  }

  @media (${({ theme }) => theme.breakpoints.xs}) {
    justify-content: space-between;
    align-items: center;
    & > .button {
      margin: 0;
    }
    & > .arrow-in-mobile {
      display: block;
    }
    & > .filter {
      position: absolute;
      z-index: 1;
      top: 58px;
      left: 5px;
      right: 5px;
      width: auto;
      background: ${({ theme }) => theme.colors.background};
      box-shadow: 0px 9px 11px -5px rgba(34, 60, 80, 0.2);
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      padding: 15px 10px;
    }
  }
`;
