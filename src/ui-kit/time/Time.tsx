import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { weekDays } from 'data/weekDays';
import styled from '@emotion/styled';

const ShowedTime = styled.div`
  color: ${({ theme }) => theme.colors.light};
`;

const Time = () => {
  const [date, setDate] = useState('');
  useEffect(() => {
    const time = setInterval(() => {
      const date = new Date();
      const parsedTime = format(date, 'dd MMMM. hh:mm');
      setDate(`${weekDays[date.getDay()]}, ${parsedTime}`);
    }, 3000);
    return () => {
      clearInterval(time);
    };
  }, []);
  return <ShowedTime>{date}</ShowedTime>;
};

export default Time;
