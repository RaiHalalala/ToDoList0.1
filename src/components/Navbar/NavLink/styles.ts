import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const LinkStyle = styled(Link)`
  position: relative;
  margin: 5px 0;
  height: 50px;
  min-height: 50px;

  @media (${({ theme }) => theme.breakpoints.xs}) {
    margin: 10px 0 0;
    width: 50px;
  }

  & > .active {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.bgContent};
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;

    @media (${({ theme }) => theme.breakpoints.xs}) {
      border-top-right-radius: 16px;
      border-bottom-left-radius: 0;
    }

    & > .active-decorate {
      position: absolute;
      right: 0;
      top: -16px;
      width: 16px;
      @media (${({ theme }) => theme.breakpoints.xs}) {
        right: -16px;
        bottom: 0;
        top: auto;
        transform: rotate(90deg);
      }
    }

    & > .bottom {
      bottom: -16px;
      top: auto;
      transform: rotate(270deg);
      @media (${({ theme }) => theme.breakpoints.xs}) {
        left: -16px;
        bottom: 0;
        transform: rotate(360deg);
      }
    }
  }
`;

type LinkNameProps = {
  isActive: boolean;
};

export const LinkName = styled.div<LinkNameProps>`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: calc(50% - 10px);
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isActive }) => (isActive ? 'font-weight: bold;' : '')}

  & > .name {
    min-width: 100px;
    color: ${({ theme }) => theme.colors.primary};
  }

  & > .icon {
    margin-right: 8px;

    @media (${({ theme }) => theme.breakpoints.xs}) {
      margin: 0;
    }
  }
`;
