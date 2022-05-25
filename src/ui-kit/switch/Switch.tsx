import { FC } from 'react';
import { Label, Input } from './styled';

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
