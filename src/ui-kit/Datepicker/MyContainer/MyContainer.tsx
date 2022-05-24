import { FC } from 'react';
import { CalendarContainer } from 'react-datepicker';
import { Wrapper } from './styled';
import 'react-datepicker/dist/react-datepicker.css';

interface MyContainerProps {
  className?: string;
  children: React.ReactNode;
}

const MyContainer: FC<MyContainerProps> = ({
  className,
  children,
}: MyContainerProps) => {
  return (
    <Wrapper>
      <CalendarContainer className={`custom ${className}`}>
        {children}
      </CalendarContainer>
    </Wrapper>
  );
};

export default MyContainer;
