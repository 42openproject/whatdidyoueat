import React from 'react';

function CalendarDateItem({
  resizeNumber,
  date,
  month,
  postedDate = [],
  today,
  clickedDate,
  setClickedDate,
  startDate = '',
  endDate = '',
  onClickDate = '',
}) {
  const item = new Date(date);
  const d = date === '' ? '' : new Date(date).getDate();

  const getItemClass = dd => {
    let tmp = 'calendar-days__day-item';
    const todayY = today.getFullYear();
    const todayM = today.getMonth() + 1;
    const todayD = today.getDate();
    const Y = dd.getFullYear();
    const M = resizeNumber(dd.getMonth() + 1);
    const D = resizeNumber(dd.getDate());

    if (+todayD === +D && +todayM === +M && todayY === Y) {
      tmp += ' calendar-days__day-item--today';
    } else if (+M !== +month) {
      tmp += ' calendar-days__day-item--not-this-month';
    }
    if (
      postedDate.length &&
      +M === +month &&
      postedDate.some(e => e === `${Y}-${M}-${D}`)
    )
      tmp += ' calendar-days__day-item--posted';
    if (clickedDate === `${Y}-${M}-${D}`)
      tmp += ' calendar-days__day-item--selected';
    if (startDate && startDate > `${Y}-${M}-${D}`)
      tmp += ' calendar-days__day-item--inactive';
    if (endDate && endDate < `${Y}-${M}-${D}`)
      tmp += ' calendar-days__day-item--inactive';
    return tmp;
  };
  const itemClass = getItemClass(item);

  const onClickDateInCalendar = e => {
    if (
      !(startDate && startDate > e.target.ariaLabel) &&
      !(endDate && endDate < e.target.ariaLabel)
    ) {
      setClickedDate(e.target.ariaLabel);
      if (onClickDate) onClickDate(new Date(e.target.ariaLabel));
    }
  };

  return (
    <>
      <div className={itemClass}>
        <abbr
          aria-label={date}
          onClick={onClickDateInCalendar}
          className="calendar-days__day-item__abbr"
        >
          {d}
        </abbr>
      </div>
    </>
  );
}

export default React.memo(CalendarDateItem);
