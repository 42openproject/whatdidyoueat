function CalendarDateItem({ date }) {
  const d = date === '' ? '' : new Date(date).getDate();
  const today = new Date();

  return (
    <>
      <div
        className="calendar-days__day-item"
        onClick={e => console.log(e.target.ariaLabel)}
      >
        <abbr aria-label={date}>{d}</abbr>
      </div>
    </>
  );
}

export default CalendarDateItem;
