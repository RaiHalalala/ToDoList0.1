import styled from '@emotion/styled';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  text-align: center;

  & > .title {
    width: 100%;
    text-align: center;
  }

  & > .arrow {
    justify-content: flex-end;
    transform: rotate(180deg);
  }
`;
