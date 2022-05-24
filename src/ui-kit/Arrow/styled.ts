import styled from '@emotion/styled';

type ButtonProps = {
  isMargin: boolean;
};

export const Button = styled.button<ButtonProps>`
  height: 30px;

  & > .arrow {
    height: 100%;
    ${({ isMargin }) => (isMargin ? 'margin-right: 10px;' : '')}
  }
`;

export const variantsForArrow = {
  show: { rotate: 360 },
  hide: { rotate: 180 },
};
