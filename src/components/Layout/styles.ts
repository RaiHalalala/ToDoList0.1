import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export const Main = styled.main`
  padding: 10px;
  display: flex;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.dark};

  @media (${({ theme }) => theme.breakpoints.l}) {
    margin: 0;
    border-radius: unset;
  }
  @media (${({ theme }) => theme.breakpoints.xs}) {
    flex-direction: column-reverse;
    align-items: center;
    padding-bottom: 0;
  }
`;

export const Nav = styled(motion.nav)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: ${({ theme }) => theme.indents.xxl};

  @media (${({ theme }) => theme.breakpoints.xs}) {
    flex-direction: row;
    justify-content: space-between;
    height: fit-content;
    padding-top: 0;
  }

  & > .setting {
    margin-top: 50px;
  }
  & > .arrow {
    position: absolute;
    right: 10px;
    top: 27px;
  }
`;

export const Logo = styled(motion.p)`
  margin-bottom: 50px;
  height: 42px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 33px;
  font-weight: bold;
  text-align: center;
`;

type SectionProps = {
  isFullNav: boolean;
};

export const Section = styled.section<SectionProps>`
  position: relative;
  width: ${({ isFullNav }) => `calc(100% - ${isFullNav ? '300px' : '50px'})`};
  height: 100%;
  border-radius: ${({ theme }) => theme.indents.xxl};
  padding: ${({ theme }) => theme.indents.xs} 20px;
  background: ${({ theme }) => theme.colors.bgContent};

  @media (${({ theme }) => theme.breakpoints.xs}) {
    width: 100%;
    height: calc(100% - 60px);
    padding: 10px 5px;
  }
`;

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
    border-top-left-radius: ${({ theme }) => theme.indents.l};
    border-bottom-left-radius: ${({ theme }) => theme.indents.l};

    @media (${({ theme }) => theme.breakpoints.xs}) {
      border-top-right-radius: ${({ theme }) => theme.indents.l};
      border-bottom-left-radius: 0;
    }

    & > .active-decorate {
      position: absolute;
      right: 0;
      top: ${({ theme }) => `-${theme.indents.l}`};
      width: ${({ theme }) => theme.indents.l};
      @media (${({ theme }) => theme.breakpoints.xs}) {
        right: ${({ theme }) => `-${theme.indents.l}`};
        bottom: 0;
        top: auto;
        transform: rotate(90deg);
      }
    }

    & > .bottom {
      bottom: ${({ theme }) => `-${theme.indents.l}`};
      top: auto;
      transform: rotate(270deg);
      @media (${({ theme }) => theme.breakpoints.xs}) {
        left: ${({ theme }) => `-${theme.indents.l}`};
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
