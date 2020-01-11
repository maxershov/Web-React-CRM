import React, { useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import { ChangeProfileValue } from '../App';
import { getStoreId } from '../store/storeGetters';


const MyCalendarWithButtons = (props) => {
  const [renderCalendar,setRenderCalendar] = useState('none');

  function changeDate(dateTo) {
    const date = moment(dateTo).format('DD-MM-YYYY');
    // changeRenderCalendar(false);
    props.dateType === 'setParent' ?
      props.setParentDate(date) :
      ChangeProfileValue(getStoreId(), date, props.dateType);
  }
  return (
    <>
      <div className={`${props.dateType  }Field`}>
        <label>{props.сalendarName}</label>
        <input type="text" readOnly value={props.date} />
        <button type="button" onClick={() => setRenderCalendar('block')}>Выбрать новую дату</button>
      </div>
      <div style={{display:renderCalendar}} className="calendar" id="calendar">
        <Calendar className="calendar" onChange={date => changeDate(date)} />
        <button type="button" onClick={() => setRenderCalendar('none')}>Убрать календарь</button>
        <button type="button" onClick={() => changeDate(null)}>Удалить дату</button>
      </div>
    </>
);
}

export default MyCalendarWithButtons;