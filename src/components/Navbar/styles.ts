import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export const Nav = styled(motion.nav)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 20px;

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
