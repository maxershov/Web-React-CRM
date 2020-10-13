import React, { useState } from 'preact/compat';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'
import Calendar from 'react-calendar';
import { ChangeProfileValue } from '../App';


const CalendarHideable = (props) => {
  const [renderCalendar, setRenderCalendar] = useState(false);
  const { codeLink } = useParams();

  function changeDate(dateTo) {
    const date = format(dateTo, 'dd-MM-yyyy');
    props.dateType === 'setParent' ?
      props.setParentDate(date) :
      ChangeProfileValue(codeLink, date, props.dateType);
    setRenderCalendar(false);
  }

  function deleteDate() {
    ChangeProfileValue(codeLink, "", props.dateType);
    setRenderCalendar(false);
  }
  return (
    <>
      <div className={`${props.dateType}Field`}>
        <label className="label">{props.сalendarName}</label>
        <input className="input" onClick={() => setRenderCalendar('block')} type="text" readOnly value={props.date} />
      </div> 
      {renderCalendar ? (
        <div className="modal">
          <Calendar className="calendar" onChange={date => changeDate(date)} />
          <div className="one-line-wrapper">
            <button className="button block-button" type="button" onClick={() => setRenderCalendar(false)}>Убрать календарь</button>
            <button className="button block-button" type="button" onClick={() => deleteDate()}>Удалить дату</button>
          </div>
        </div>
      ) : undefined}
    </>
  );
}

export default CalendarHideable;