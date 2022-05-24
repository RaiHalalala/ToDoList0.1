import { FC, ElementType, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonStyle } from './styled';
import { ThemeButton } from '.';

interface ButtonProps {
  as?: ElementType;
  type?: 'button' | 'submit';
  to?: string;
  disabled?: boolean;
  themeButton?: ThemeButton;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  as = 'button',
  type = 'button',
  to,
  disabled = false,
  themeButton,
  className,
  onClick,
  children,
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
