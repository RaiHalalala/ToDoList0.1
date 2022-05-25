import React, { FC } from 'react';
import { setEscapingString } from 'utils/helper';
import { Label, TextAreaStyle } from './styled';

interface TextAreaProps {
  value: string;
  className?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const TextArea: FC<TextAreaProps> = ({
  value,
  className,
  placeholder,
  onChange,
}: TextAreaProps) => (
  <Label className={className}>
    <TextAreaStyle
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        const value = setEscapingString(e.currentTarget.value);
        onChange(value);
      }}
    />
  </Label>
);
export default TextArea;
