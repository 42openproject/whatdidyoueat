import { useEffect, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import CalendarDateItem from './CalendarDateItem';
import './Calendar.css';

function Calendar({
  onClickDate = '',
  startDate = '',
  endDate = '',
  postedDate = '',
  onChangeActiveMonth = '',
}) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [date, setDate] = useState(today.getDate());
  const [dateArr, setDateArr] = useState([]);
  const [view, setView] = useState('week');
  const weekName = ['일', '월', '화', '수', '목', '금', '토'];

  const resizeNumber = number => {
    if (number < 10) return `0${number}`;
    return number;
  };

  const makeStringDate = d => {
    if (!d) return '';
    return `${d.getFullYear()}-${resizeNumber(d.getMonth() + 1)}-${resizeNumber(
      d.getDate(),
    )}`;
  };
  const [clickedDate, setClickedDate] = useState(makeStringDate(new Date()));

  const getDateArrMonth = (y, m) => {
    const startDay = new Date(`${y}-${m}-1`).getDay();
    const mEndDate = new Date(y, m, 0).getDate();
    const endDay = new Date(y, m, 0).getDay();
    const prevMonthDate = new Date(y, m - 1, 0);
    const nextMonthDate = new Date(y, m, 1);
    const someArr = [];

    if (startDay > 0) {
      const py = prevMonthDate.getFullYear();
      const pm = prevMonthDate.getMonth() + 1;
      let pd = prevMonthDate.getDate();
      for (let i = 0; i < startDay; i += 1) {
        someArr.unshift(`${py}-${resizeNumber(pm)}-${resizeNumber(pd)}`);
        pd -= 1;
      }
    }
    for (let i = 0; i < mEndDate; i += 1) {
      someArr.push(`${y}-${resizeNumber(m)}-${resizeNumber(i + 1)}`);
    }
    if (endDay < 6) {
      const ny = nextMonthDate.getFullYear();
      const nm = nextMonthDate.getMonth() + 1;
      let nd = nextMonthDate.getDate();
      for (let i = 0; i < 6 - endDay; i += 1) {
        someArr.push(`${ny}-${resizeNumber(nm)}-${resizeNumber(nd)}`);
        nd += 1;
      }
    }
    setDateArr(someArr);
    // console.log(someArr);
  };

  const getDateArrWeek = () => {
    const someArr = [];
    const todayD = today.getDate();
    let M = today.getMonth() + 1;
    let Y = today.getFullYear();
    someArr.push(`${Y}-${resizeNumber(M)}-${resizeNumber(todayD)}`);
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
      someArr.unshift(`${Y}-${resizeNumber(M)}-${resizeNumber(prevD)}`);
      prevD -= 1;
    }
    let nextD = todayD + 1;
    const lastDate = new Date(Y, M, 0);
    for (let i = 0; i < 6 - prevDay; i += 1) {
      if (lastDate.getDate() < nextD) {
        console.log('in');
        M += 1;
        nextD = 1;
        if (M > 12) {
          M = 1;
          Y += 1;
        }
      }
      someArr.push(`${Y}-${resizeNumber(M)}-${resizeNumber(nextD)}`);
      nextD += 1;
    }
    setDateArr(someArr);
  };

  useEffect(() => {
    if (view === 'month') getDateArrMonth(year, month);
    else if (view === 'week') getDateArrWeek();
    if (onChangeActiveMonth)
      onChangeActiveMonth(new Date(`${year}-${month}-${date}`));
  }, [year, month, date, view]);

  const onClickPrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
    if (onChangeActiveMonth)
      onChangeActiveMonth(new Date(`${year}-${month}-${date}`));
  };
  const onClickNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
    if (onChangeActiveMonth)
      onChangeActiveMonth(new Date(`${year}-${month}-${date}`));
  };

  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
    setDate(today.getDate());
    if (onChangeActiveMonth) onChangeActiveMonth(today);
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
      <div className="calander-all-container">
        <section className="calendar-header">
          <div className="header-year-month">
            {year}년 {month}월
          </div>
          <div className="month-btn-wrap">
            {view === 'month' && (
              <>
                <button className="prev-month-btn" onClick={onClickPrevMonth}>
                  <GrFormPrevious />
                </button>
                <button className="prev-month-btn" onClick={onClickNextMonth}>
                  <GrFormNext />
                </button>
              </>
            )}

            <button
              className="calendar-view-change-btn"
              onClick={onClickViewChange}
            >
              {view === 'week' ? (
                <BsFillCaretDownFill />
              ) : (
                <BsFillCaretUpFill />
              )}
            </button>
          </div>
        </section>
        {view === 'month' && (
          <section className="calendar-week">
            {weekName.map((w, i) => {
              return (
                <div className="week-item" key={i}>
                  {w}
                </div>
              );
            })}
          </section>
        )}
        <section className="calendar-days">
          {dateArr.length &&
            dateArr.map((d, i) => {
              return (
                <CalendarDateItem
                  resizeNumber={resizeNumber}
                  date={d}
                  key={i}
                  month={month}
                  postedDate={postedDate}
                  today={today}
                  todayDate={date}
                  clickedDate={clickedDate}
                  setClickedDate={setClickedDate}
                  startDate={startDate}
                  endDate={makeStringDate(endDate)}
                  onClickDate={onClickDate}
                />
              );
            })}
        </section>
      </div>
    </>
  );
}

export default Calendar;
