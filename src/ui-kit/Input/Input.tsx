import React, { FC } from 'react';
import { setEscapingString } from 'utils/helper';
import { Label, InputStyle, IconButton } from './styled';

interface InputProps {
  autoFocus?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  className?: string;
  setIcon?: () => React.ReactElement;
  onClickIcon?: () => void;
}

const Input: FC<InputProps> = ({
  autoFocus,
  placeholder,
  onChange,
  onFocus,
  value,
  className,
  setIcon,
  onClickIcon,
  ...params
}: InputProps) => (
  <Label className={className}>
    <InputStyle
      className="input"
      autoFocus={autoFocus}
      onFocus={onFocus}
      onBlur={() => {}}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        const value = e.currentTarget.value;
        onChange && onChange(setEscapingString(value));
      }}
      {...params}
    />
    {setIcon && (
      <IconButton type="button" onClick={onClickIcon}>
        {setIcon()}
      </IconButton>
    )}
  </Label>
);

export default Input;
