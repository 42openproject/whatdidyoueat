import { useState } from 'react';
import Calendar from 'react-calendar';
import '../stylesheets/MainCalendar.css';

const MainCalendar = ({ clickedDay, setClickedDay }) => {
  const [date, setDate] = useState(new Date());

  const onClickDay = e => {
    console.log(`${e.getMonth() + 1}월 ${e.getDate()}일 입니다`);
    setClickedDay(`${e.getMonth() + 1}월 ${e.getDate()}일 입니다`);
  };

  return (
    <>
      <Calendar
        // className="main-calendar"
        onChange={setDate}
        value={date}
        maxDate={new Date()}
        view="week"
        locale="en-US"
        onClickDay={onClickDay}
        formatMonthYear={() =>
          new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'numeric',
          }).format(date)
        }
      />
    </>
  );
};

export default MainCalendar;
