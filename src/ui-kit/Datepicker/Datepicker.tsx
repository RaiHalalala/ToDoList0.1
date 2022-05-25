import { FC, useState } from 'react';
import { DATE_FORMAT } from 'constants/tests';
import { setFormatDate, setNextDay } from 'utils/helper';
import DatePicker from 'react-datepicker';
import MyContainer from './MyContainer';
import CustomInput from './CustomInput';
import { Wrapper, DateContainer } from './styled';
import 'react-datepicker/dist/react-datepicker.css';

interface DatepickerProps {
  className?: string;
  start?: Date;
  end?: Date;
  changeTimes?: (start: string, end: string) => void;
}

const Datepicker: FC<DatepickerProps> = ({
  className,
  start,
  end,
  changeTimes,
}: DatepickerProps) => {
  const nextDay = end || new Date(setNextDay(start || new Date()));
  const [startDate, setStartDate] = useState(start || new Date());
  const [endDate, setEndDate] = useState(nextDay);

  const params = {
    startDate,
    endDate,
    dateFormat: DATE_FORMAT,
    calendarContainer: MyContainer,
    customInput: <CustomInput />,
  };
  const changeStartDate = (date: Date) => {
    if (!date) return;
    setStartDate(date);
    if (changeTimes) {
      const start = setFormatDate(date, DATE_FORMAT);
      const end = setFormatDate(endDate, DATE_FORMAT);
      changeTimes(start, end);
    }
  };
  const changeEndDate = (date: Date) => {
    if (!date) return;
    setEndDate(date);
    if (changeTimes) {
      const start = setFormatDate(startDate, DATE_FORMAT);
      const end = setFormatDate(date, DATE_FORMAT);
      changeTimes(start, end);
    }
  };
  return (
    <Wrapper className={className}>
      <DateContainer>
        <h4 className="header">Date start</h4>
        <DatePicker
          selected={startDate}
          selectsStart
          onChange={changeStartDate}
          {...params}
        />
      </DateContainer>
      <DateContainer>
        <h4 className="header">Deadline</h4>
        <DatePicker
          selected={endDate}
          selectsEnd
          minDate={startDate}
          onChange={changeEndDate}
          {...params}
        />
      </DateContainer>
    </Wrapper>
  );
};

export default Datepicker;
