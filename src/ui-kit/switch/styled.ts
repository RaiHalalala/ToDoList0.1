import styled from '@emotion/styled';

type LabelProps = {
  checked: boolean;
};

export const Label = styled.label<LabelProps>`
  cursor: pointer;
  width: 40px;
  height: 25px;
  background: ${({ checked, theme }) =>
    checked ? theme.colors.primary : 'grey'};
  display: block;
  border-radius: 100px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
    ${({ checked }) => (checked ? 'left: calc(100% - 5px);' : '')}
    ${({ checked }) => (checked ? 'transform: translateX(-100%);' : '')}
  }
`;

export const Input = styled.input`
  margin: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
`;
