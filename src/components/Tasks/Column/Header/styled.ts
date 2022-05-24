import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  height: 45px;
  padding: 5px 0;

  & > .name {
    max-width: 140px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: bold;
  }
  @media (${({ theme }) => theme.breakpoints.xs}) {
    align-items: center;
  }
`;
