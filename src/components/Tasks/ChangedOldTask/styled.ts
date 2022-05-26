import styled from '@emotion/styled';

export const LeftContent = styled.div`
  width: 60%;
  height: 100%;
  background: ${({ theme }) => theme.colors.bgLight};
  border-radius: inherit;
  padding: 10px;
  display: flex;
  flex-direction: column;

  & > .submit {
    margin: auto auto 0;
  }
  @media (${({ theme }) => theme.breakpoints.xs}) {
    width: auto;
  }
`;

export const RightContent = styled.div`
  width: 40%;
  padding: 10px;
  @media (${({ theme }) => theme.breakpoints.xs}) {
    width: auto;
  }
`;

export const Info = styled.div`
  margin-top: 10px;
  height: calc(100% - 40px);
  padding-right: 20px;
  overflow-y: scroll;
  @media (${({ theme }) => theme.breakpoints.xs}) {
    overflow-y: unset;
    height: 100%;
    display: flex;
    flex-direction: column;

    & > .submit {
      margin-top: 50px;
    }
  }
`;

export const List = styled.ul`
  margin: 0;
  margin-bottom: 30px;
  overflow-y: scroll;
  padding-right: 20px;
`;

export const EmptyList = styled.p`
  text-align: center;
`;

export const Name = styled.p`
  margin-top: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fonts.x};
  text-transform: uppercase;
`;

export const HeaderDescription = styled.h3`
  margin: 0 0 10px;
`;
