import { useEffect, useState } from 'react';
import CalendarDateItem from './CalendarDateItem';
import './Calendar.css';

function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState(new Date().getDate());
  const [dateArr, setDateArr] = useState([]);

  const getDateArr = (y, m) => {
    const startDay = new Date(`${y}-${m}-1`).getDay();
    const endDate = new Date(y, m, 0).getDate();
    const someArr = [];

    for (let i = 0; i < startDay; i += 1) {
      someArr.push('');
    }
    for (let i = 0; i < endDate; i += 1) {
      someArr.push(`${y}-${m}-${i + 1}`);
    }
    setDateArr(someArr);
    console.log(someArr);
    // console.log(startDay);
    // console.log(endDate);
  };

  useEffect(() => {
    // 윤년 구하기
    const lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      lastDay[1] = 29;
    } else {
      lastDay[1] = 28;
    }

    getDateArr(year, month);
  }, [year, month, date]);

  const onClickPrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };
  const onClickNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <>
      <section className="calendar-header">
        <div className="header-year">{year}</div>
        <div className="month-wrap">
          <button className="prev-month-btn" onClick={onClickPrevMonth}>
            이전달
          </button>
          <div className="header-month">{month}</div>
          <button className="prev-month-btn" onClick={onClickNextMonth}>
            다음달
          </button>
        </div>
        <button className="today-month-btn">오늘</button>
      </section>
      <section className="calendar-week">
        <div className="week-item">일</div>
        <div className="week-item">월</div>
        <div className="week-item">화</div>
        <div className="week-item">수</div>
        <div className="week-item">목</div>
        <div className="week-item">금</div>
        <div className="week-item">토</div>
      </section>
      <section className="calendar-days">
        {dateArr.length &&
          dateArr.map((d, i) => {
            return <CalendarDateItem date={d} key={i} />;
          })}
      </section>
    </>
  );
}

export default Calendar;
