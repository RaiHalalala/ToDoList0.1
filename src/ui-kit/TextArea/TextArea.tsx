import React, { FC } from 'react';
import styled from '@emotion/styled';
import { setEscapingString } from 'utils/helper';

const Label = styled.label`
  display: block;
  width: 100%;
  height: 90px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
`;

const TextAreaStyle = styled.textarea`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 10px;
  background: transparent;
  border: 0;
  border-radius: inherit;
`;

interface TextAreaProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

const TextArea: FC<TextAreaProps> = ({
  placeholder,
  onChange,
  value,
  className,
}: TextAreaProps) => {
  return (
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
};
export default TextArea;
