import styled from '@emotion/styled';

export const LeftContent = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background: ${({ theme }) => theme.colors.bgLight};
  border-radius: inherit;
  padding: 10px;

  & > .form-item {
    margin: 20px 0;
  }
  & > .submit {
    margin: 0 auto;
    margin-top: auto;
  }
  @media (${({ theme }) => theme.breakpoints.xs}) {
    height: auto;
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > .name {
    margin: 0 20px 0 0;
  }

  @media (${({ theme }) => theme.breakpoints.xs}) {
    justify-content: flex-start;
  }
`;

export const RightContent = styled.div`
  margin-top: 10px;
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > .color-picker {
    width: 140px;
  }
  @media (${({ theme }) => theme.breakpoints.xs}) {
    height: auto;
    width: 100%;

    & > .submit {
      margin-top: 50px;
    }
  }
`;

export const Delete = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bgLight};
  color: ${({ theme }) => theme.colors.accent};

  & > .icon {
    margin-right: 10px;
  }
  @media (${({ theme }) => theme.breakpoints.xs}) {
    margin-top: 20px;
  }
`;
