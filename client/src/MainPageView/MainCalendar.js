import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import '../stylesheets/MainCalendar.css';

const MainCalendar = ({ clickedDay, setClickedDay }) => {
  const [date, setDate] = useState(new Date());

  const onClickDay = e => {
    console.log(`${e.getMonth() + 1}월 ${e.getDate()}일 입니다`);
    setClickedDay(`${e.getMonth() + 1}월 ${e.getDate()}일 입니다`);
  };

  // test api
  useEffect(async () => {
    const response = await axios.get(`http://localhost:8000/calendar/dhyeon`);

    console.log(response);
  }, []);

  return (
    <>
      <Calendar
        // className="main-calendar"
        onChange={setDate}
        value={date}
        maxDate={new Date()}
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
