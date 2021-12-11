import { useState } from 'react';

function CalendarDateItem({
  date,
  month,
  postedDate = [],
  today,
  clickedDate,
  setClickedDate,
}) {
  const item = new Date(date);
  const d = date === '' ? '' : new Date(date).getDate();

  const getItemClass = dd => {
    let tmp = 'calendar-days__day-item';
    const todayY = today.getFullYear();
    const todayM = today.getMonth() + 1;
    const todayD = today.getDate();
    const Y = dd.getFullYear();
    const M = dd.getMonth() + 1;
    const D = dd.getDate();

    if (todayD === D && todayM === M && todayY === Y) {
      tmp += ' calendar-days__day-item--today';
    } else if (M !== month) {
      tmp += ' calendar-days__day-item--not-this-month';
    }
    if (
      postedDate.length &&
      M === month &&
      postedDate.some(e => e === dd.getDate())
    )
      tmp += ' calendar-days__day-item--posted';
    if (clickedDate === `${Y}-${M}-${D}`)
      tmp += ' calendar-days__day-item--selected';
    return tmp;
  };
  const itemClass = getItemClass(item);

  const onClickDate = e => {
    setClickedDate(e.target.ariaLabel);
    // e.target.classList.toggle('calendar-days__day-item--selected');
    console.log(e.target.ariaLabel);
  };

  return (
    <>
      <div className={itemClass}>
        <abbr
          aria-label={date}
          onClick={onClickDate}
          className="calendar-days__day-item__abbr"
        >
          {d}
        </abbr>
      </div>
    </>
  );
}

export default CalendarDateItem;
