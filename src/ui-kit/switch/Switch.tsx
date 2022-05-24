import { FC } from 'react';
import styled from '@emotion/styled';

type LabelProps = {
  checked: boolean;
};

const Label = styled.label<LabelProps>`
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

const Input = styled.input`
  margin: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
`;

interface SwitchProps {
  checked?: boolean;
  onClick?: (val: boolean) => void;
}

const Switch: FC<SwitchProps> = ({ checked = false, onClick }: SwitchProps) => {
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    onClick && onClick(checked);
  };
  return (
    <Label className="label" checked={checked}>
      <Input
        checked={checked}
        onChange={onChange}
        className="input"
        type="checkbox"
      />
    </Label>
  );
};

export default Switch;
