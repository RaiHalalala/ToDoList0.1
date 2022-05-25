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

type SectionProps = {
  isFullNav: boolean;
};

export const Section = styled.section<SectionProps>`
  position: relative;
  width: ${({ isFullNav }) => `calc(100% - ${isFullNav ? '300px' : '50px'})`};
  height: 100%;
  border-radius: 20px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.bgContent};

  @media (${({ theme }) => theme.breakpoints.xs}) {
    width: 100%;
    height: calc(100% - 60px);
    padding: 10px 5px;
  }
`;
