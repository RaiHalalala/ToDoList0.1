import React, { FC } from 'react';
import { setEscapingString } from 'utils/helper';
import { Label, InputStyle, IconButton } from './styled';

interface InputProps {
  value?: string;
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onClickIcon?: () => void;
  onChange?: (value: string) => void;
  setIcon?: () => React.ReactElement;
}

const Input: FC<InputProps> = ({
  value,
  className,
  autoFocus,
  placeholder,
  onFocus,
  setIcon,
  onChange,
  onClickIcon,
  ...params
}: InputProps) => {
  const IconInInput = setIcon && (
    <IconButton type="button" onClick={onClickIcon}>
      {setIcon()}
    </IconButton>
  );
  return (
    <Label className={className}>
      <InputStyle
        className="input"
        autoFocus={autoFocus}
        onFocus={onFocus}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const value = e.currentTarget.value;
          onChange && onChange(setEscapingString(value));
        }}
        {...params}
      />
      {IconInInput}
    </Label>
  );
};

export default Input;
