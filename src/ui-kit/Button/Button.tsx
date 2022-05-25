import { FC, ElementType, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonStyle } from './styled';
import { ThemeButton } from '.';

interface ButtonProps {
  to?: string;
  as?: ElementType;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  themeButton?: ThemeButton;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  to,
  children,
  className,
  themeButton,
  as = 'button',
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) => {
  const history = useHistory();
  const onClicked = () => {
    to && history.push(to);
    onClick && onClick();
  };
  return (
    <ButtonStyle
      as={as}
      disabled={disabled}
      themeButton={themeButton || ThemeButton.primary}
      type={type}
      className={className}
      onClick={onClicked}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
