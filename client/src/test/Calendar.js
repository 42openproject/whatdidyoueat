import { useEffect, useState } from 'react';
import CalendarDateItem from './CalendarDateItem';
import './Calendar.css';

function Calendar() {
  const today = new Date();
  // const today = new Date(`2022-1-1`);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [date, setDate] = useState(today.getDate());
  const [dateArr, setDateArr] = useState([]);
  const [view, setView] = useState('week');
  const weekName = ['일', '월', '화', '수', '목', '금', '토'];
  const [clickedDate, setClickedDate] = useState('');

  const getDateArrMonth = (y, m) => {
    const startDay = new Date(`${y}-${m}-1`).getDay();
    const endDate = new Date(y, m, 0).getDate();
    const endDay = new Date(y, m, 0).getDay();
    const prevMonthDate = new Date(y, m - 1, 0);
    const nextMonthDate = new Date(y, m, 1);
    const someArr = [];

    if (startDay > 0) {
      const py = prevMonthDate.getFullYear();
      const pm = prevMonthDate.getMonth() + 1;
      let pd = prevMonthDate.getDate();
      for (let i = 0; i < startDay; i += 1) {
        someArr.unshift(`${py}-${pm}-${pd}`);
        pd -= 1;
      }
    }
    for (let i = 0; i < endDate; i += 1) {
      someArr.push(`${y}-${m}-${i + 1}`);
    }
    if (endDay < 6) {
      const ny = nextMonthDate.getFullYear();
      const nm = nextMonthDate.getMonth() + 1;
      let nd = nextMonthDate.getDate();
      for (let i = 0; i < 6 - endDay; i += 1) {
        someArr.push(`${ny}-${nm}-${nd}`);
        nd += 1;
      }
    }
    setDateArr(someArr);
    console.log(someArr);
    // console.log(startDay);
    // console.log(endDate);
  };

  const getDateArrWeek = () => {
    const someArr = [];
    const todayD = today.getDate();
    let M = today.getMonth() + 1;
    let Y = today.getFullYear();
    console.log(todayD);
    someArr.push(`${Y}-${M}-${todayD}`);
    const prevDay = today.getDay();
    let prevD = todayD - 1;
    for (let i = 0; i < prevDay; i += 1) {
      if (prevD === 0) {
        const prevM = new Date(Y, M - 1, 0);
        console.log('prevM : ', prevM);
        prevD = prevM.getDate();
        M -= 1;
        if (M < 1) {
          Y -= 1;
          M = 12;
        }
      }
      someArr.unshift(`${Y}-${M}-${prevD}`);
      prevD -= 1;
    }
    let nextD = todayD + 1;
    const lastDate = new Date(Y, M, 0);
    console.log(lastDate);
    for (let i = 0; i < 6 - prevDay; i += 1) {
      if (lastDate.getDate() < nextD) {
        console.log('in');
        const nextM = new Date(Y, M + 1, 1);
        M += 1;
        nextD = 1;
        if (M > 12) {
          M = 1;
          Y += 1;
        }
      }
      someArr.push(`${Y}-${M}-${nextD}`);
      nextD += 1;
    }
    setDateArr(someArr);
  };

  useEffect(() => {
    if (view === 'month') getDateArrMonth(year, month);
    else if (view === 'week') getDateArrWeek();
  }, [year, month, date, view]);

  // useEffect(() => {
  //   if (clickedDate) {
  //     clickedDate.className += ' calendar-days__day-item--selected';
  //   }
  // }, [clickedDate]);

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

  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
    setDate(today.getDate());
  };

  const onClickViewChange = () => {
    if (view === 'week') {
      goToday();
      setView('month');
    } else {
      goToday();
      setView('week');
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
        <button
          className="calendar-view-change-btn"
          onClick={onClickViewChange}
        >
          뷰
        </button>
      </section>
      <section className="calendar-week">
        {weekName.map((w, i) => {
          return (
            <div className="week-item" key={i}>
              {w}
            </div>
          );
        })}
      </section>
      <section className="calendar-days">
        {dateArr.length &&
          dateArr.map((d, i) => {
            return (
              <CalendarDateItem
                date={d}
                key={i}
                month={month}
                postedDate={[1, 3, 5, 7, 9]}
                today={today}
                clickedDate={clickedDate}
                setClickedDate={setClickedDate}
              />
            );
          })}
      </section>
    </>
  );
}

export default Calendar;
