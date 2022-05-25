import styled from '@emotion/styled';

export const ColumnWrapper = styled.div`
  margin: 0 5px;
  min-width: 200px;
  padding: 10px;
  padding-top: 0;
  height: fit-content;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 10px;

  @media (${({ theme }) => theme.breakpoints.xs}) {
    margin: 5px 0;
  }
`;

export const Content = styled.div`
  position: relative;
  padding-bottom: 60px;

  & > .arrow {
    height: 25px;
    transform: rotate(270deg);
  }

  @media (${({ theme }) => theme.breakpoints.xs}) {
    padding-bottom: 0;
    transition: 0.3s;
  }
`;

export const NewTask = styled.button`
  position: absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  padding: 0;

  & > .image {
    width: 100%;
    height: 100%;
  }

  @media (${({ theme }) => theme.breakpoints.xs}) {
    display: none;
  }
`;
