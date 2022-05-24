import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: 10px;
  width: calc(100% - 20px);
  border-radius: 20px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.bgContent};
`;

export const Name = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

export const Block = styled.div`
  margin: 10px 0;
  display: flex;
  min-height: 20px;
`;

export const Title = styled.p`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.light};
`;
