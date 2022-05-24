import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: 10px 0 30px;
  width: 100%;

  & > .arrow {
    margin: 15px 0;
    display: flex;
    margin-left: 10px;
    height: 12px;
  }
  & > .date-picker {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.bgLight};
  }
`;

export const WrapperProgress = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  background: ${({ theme }) => theme.colors.bgLight};
  border-radius: 20px;

  &:before {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    background: ${({ theme }) => theme.colors.text};
    height: 15px;
    width: 1px;
  }
  &:after {
    content: '';
    position: absolute;
    top: 25px;
    right: 8px;
    background: ${({ theme }) => theme.colors.text};
    height: 5px;
    width: 5px;
    border-radius: 50%;
  }
`;

type ProgressProps = {
  width: number;
};

export const Progress = styled.div<ProgressProps>`
  position: relative;
  width: ${({ width }) => `${width}%`};
  max-width: 100%;
  min-width: 10%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: inherit;

  &:before {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    background: ${({ theme }) => theme.colors.text};
    height: 15px;
    width: 1px;
  }
  &:after {
    content: '';
    position: absolute;
    top: 25px;
    right: 8px;
    background: ${({ theme }) => theme.colors.text};
    height: 5px;
    width: 5px;
    border-radius: 50%;
  }
`;

export const WrapperDate = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const DateString = styled.p`
  width: fit-content;
`;
