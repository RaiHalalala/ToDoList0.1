import { FC, useState, useEffect } from 'react';
import { DEADLINE_TITLE } from 'constants/tests';
import Arrow from 'ui-kit/Arrow';
import Datepicker from 'ui-kit/Datepicker';
import { setFormatDate, calcProgress, setBetweenOfDate } from 'utils/helper';
import {
  Wrapper,
  WrapperProgress,
  Progress,
  WrapperDate,
  DateString,
} from './styled';

interface DeadlineProgressProps {
  datecreated: string;
  deadline: string;
  changeDate: (start: string, end: string) => void;
}

type Times = {
  term: number;
  between: number;
};

const DeadlineProgress: FC<DeadlineProgressProps> = ({
  datecreated,
  deadline,
  changeDate,
}: DeadlineProgressProps) => {
  const [times, setTimes] = useState<Times | null>(null);
  const [isHideCalendar, setIsHideCalendar] = useState(true);
  useEffect(() => {
    const value = setBetweenOfDate(new Date(datecreated), new Date(deadline));
    setTimes(value);
  }, []);

  const changeTimes = (startDate: string, endDate: string) => {
    const value = setBetweenOfDate(new Date(startDate), new Date(endDate));
    setTimes(value);
    changeDate(startDate, endDate);
  };
  return (
    <Wrapper>
      <WrapperProgress>
        <Progress width={calcProgress(times?.term, times?.between)} />
      </WrapperProgress>
      <WrapperDate>
        <DateString>{setFormatDate(new Date(datecreated))}</DateString>
        <DateString>{setFormatDate(new Date(deadline))}</DateString>
      </WrapperDate>
      <Arrow
        isShow={isHideCalendar}
        position="horizontal"
        onClick={() => setIsHideCalendar((prev) => !prev)}
        className="arrow">
        {DEADLINE_TITLE}
      </Arrow>
      {!isHideCalendar && (
        <Datepicker
          className="date-picker"
          start={new Date(datecreated)}
          end={new Date(deadline)}
          changeTimes={changeTimes}
        />
      )}
    </Wrapper>
  );
};

export default DeadlineProgress;
