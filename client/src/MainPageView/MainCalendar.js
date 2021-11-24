import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import '../stylesheets/MainCalendar.css';

const MainCalendar = ({ clickedDay, setClickedDay }) => {
  const [dateVal, setDateVal] = useState(new Date());
  const [monthVal, setMonthVal] = useState(new Date());
  const [postedDate, setPostedDate] = useState([]);

  const onClickDay = e => {
    console.log(`${e.getMonth() + 1}월 ${e.getDate()}일 입니다`);
    setClickedDay(`${e.getMonth() + 1}월 ${e.getDate()}일 입니다`);
  };

  const setPostedDay = allday => {
    // console.log(view);
    if (
      postedDate.find(
        d =>
          d === allday.date.getDate() &&
          allday.activeStartDate.getMonth() === allday.date.getMonth(),
      )
    )
      return 'calendal--posted-date';
    return '';
  };

  // test api
  useEffect(async () => {
    const response = await axios.get(`http://localhost:8000/calendar/dhyeon`);

    console.log(response.data.data);
    setPostedDate(response.data.data);
  }, []);

  const testFormat = () => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'numeric',
    }).format(monthVal);
  };

  const onActiveStartDateChange = data => {
    console.log(data);
    const oldDate = dateVal;
    if (data.action !== 'onChange') setMonthVal(data.activeStartDate);
  };

  return (
    <>
      <Calendar
        // className="main-calendar"
        onChange={setDateVal}
        value={dateVal}
        maxDate={new Date()}
        locale="en-US"
        onClickDay={onClickDay}
        // formatMonthYear={() =>
        //   new Intl.DateTimeFormat('ko-KR', {
        //     year: 'numeric',
        //     month: 'numeric',
        //   }).format(dateVal)
        // }
        formatMonthYear={testFormat}
        tileClassName={setPostedDay}
        onActiveStartDateChange={onActiveStartDateChange}
      />
    </>
  );
};

export default MainCalendar;
