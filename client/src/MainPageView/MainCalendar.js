import { useState, useEffect } from 'react';
import axios from 'axios';
// import Calendar from 'react-calendar';
import Calendar from '../Calendar/Calendar';
import '../stylesheets/MainCalendar.css';

const MainCalendar = ({ setClickedDay }) => {
  // const [dateVal, setDateVal] = useState(new Date());
  const [monthVal, setMonthVal] = useState(new Date());
  const [postedDate, setPostedDate] = useState([]);

  // 달력에서 날짜 선택
  const onClickDay = e => {
    setClickedDay(e);
  };

  // test api 포스팅된 날짜 달력에 표시하기
  useEffect(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/calendar/${monthVal.getMonth() + 1}`,
      );

      // console.log(response.data.data);
      setPostedDate(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  }, [monthVal]); // 월 화살표 눌러서 바꿀때마다 요청받도록

  const onChangeActiveMonth = data => {
    setMonthVal(data);
  };

  return (
    <>
      {/* <Calendar
        onChange={setDateVal}
        value={dateVal}
        maxDate={new Date()}
        locale="en-US"
        onClickDay={onClickDay}
        formatMonthYear={testFormat}
        tileClassName={setPostedDay}
        onActiveStartDateChange={onActiveStartDateChange}
      /> */}
      <Calendar
        endDate={new Date()}
        onClickDate={onClickDay}
        postedDate={postedDate}
        onChangeActiveMonth={onChangeActiveMonth}
      />
    </>
  );
};

export default MainCalendar;
