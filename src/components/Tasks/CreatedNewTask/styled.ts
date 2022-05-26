import styled from '@emotion/styled';

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  min-width: 60%;
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
    max-width: 100%;
    min-width: 100%;
  }
`;

export const RightContent = styled.div`
  height: 100%;
  width: 40%;
  padding: 10px 50px 10px 10px;
  @media (${({ theme }) => theme.breakpoints.xs}) {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;

    & > .submit {
      margin-top: 50px;
    }
  }
`;
