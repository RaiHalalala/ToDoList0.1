import styled from '@emotion/styled';

type WrapperProps = {
  isActive?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  margin-bottom: 10px;
  width: 100%;
  height: 60px;
  padding: 5px;
  background: ${({ theme }) => theme.colors.bgLight};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  ${({ theme, isActive }) =>
    isActive ? `border: 1px solid ${theme.colors.primary};` : ''}
  &:focus,
  :active {
    background: ${({ theme }) => theme.colors.bgContent};
  }
`;

export const Name = styled.p`
  color: ${({ theme }) => theme.colors.text};
`;
export const Deadline = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fonts.xs};
`;
