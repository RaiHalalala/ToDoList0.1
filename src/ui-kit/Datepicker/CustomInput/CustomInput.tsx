import { forwardRef } from 'react';
import Button, { ThemeButton } from 'ui-kit/Button';
import styled from '@emotion/styled';
import 'react-datepicker/dist/react-datepicker.css';

const CustomInputStyle = styled.button`
  font-size: ${({ theme }) => theme.fonts.s};
  color: ${({ theme }) => theme.colors.secondary};
`;

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick }: CustomInputProps, ref) => (
    <CustomInputStyle type="button" onClick={onClick} ref={ref}>
      <Button as="div" type="button" themeButton={ThemeButton.secondary}>
        {value}
      </Button>
    </CustomInputStyle>
  ),
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
