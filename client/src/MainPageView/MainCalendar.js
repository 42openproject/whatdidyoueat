import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from '../Calendar/Calendar';
import '../stylesheets/MainCalendar.css';

const MainCalendar = ({ setClickedDay, testFlag = false, userNickname }) => {
  // const [dateVal, setDateVal] = useState(new Date());
  const [monthVal, setMonthVal] = useState(new Date());
  const [postedDate, setPostedDate] = useState([]);
  const [startedDate, setStartedDate] = useState(new Date('2020-01-01'));

  // 달력에서 날짜 선택
  const onClickDay = e => {
    setClickedDay(e);
  };

  // test api 포스팅된 날짜 달력에 표시하기
  useEffect(async () => {
    try {
      // test api
      if (testFlag) {
        const response = await axios.get(
          `http://localhost:8000/calendar/${monthVal.getMonth() + 1}`,
        );
        setPostedDate(response.data.data);
      } else if (userNickname) {
        // 본 api
        const y = monthVal.getFullYear();
        const m =
          monthVal.getMonth() < 10
            ? `0${monthVal.getMonth() + 1}`
            : monthVal.getMonth() + 1;
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/calendar/${userNickname}?year=${y}&month=${m}`,
        );
        if (data.success) {
          setPostedDate(data.data.date);
          setStartedDate(data.data.startedAt);
        } else console.log('calendar api get false');
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [monthVal, testFlag, userNickname]); // 월 화살표 눌러서 바꿀때마다 요청받도록

  const onChangeActiveMonth = data => {
    setMonthVal(data);
  };

  return (
    <>
      <Calendar
        endDate={new Date()}
        onClickDate={onClickDay}
        postedDate={postedDate}
        onChangeActiveMonth={onChangeActiveMonth}
        startDate={startedDate}
      />
    </>
  );
};

export default MainCalendar;
