import styled from '@emotion/styled';

export const Button = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export type AttrImage = {
  src: string;
  alt: string;
  width: string;
  className?: string;
};

export const Image = styled.img<AttrImage>`
  width: ${({ width }) => width};
`;
