import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import '../stylesheets/MainCalendar.css';

const MainCalendar = ({ clickedDay, setClickedDay }) => {
  const [dateVal, setDateVal] = useState(new Date());
  const [monthVal, setMonthVal] = useState(new Date());
  const [postedDate, setPostedDate] = useState([]);

  // 달력에서 날짜 선택
  const onClickDay = e => {
    setClickedDay(e);
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

  // test api 포스팅된 날짜 달력에 표시하기
  useEffect(async () => {
    const response = await axios.get(
      `http://localhost:8000/calendar/${monthVal.getMonth() + 1}`,
    );

    console.log(response.data.data);
    setPostedDate(response.data.data);
  }, [monthVal]); // 월 화살표 눌러서 바꿀때마다 요청받도록

  // 달력 년.월 표시 포맷
  const testFormat = () => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'numeric',
    }).format(monthVal);
  };

  // 달력에 화살표 누를때 현재 월 표시
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
