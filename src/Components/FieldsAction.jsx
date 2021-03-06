import React, { useState } from 'preact/compat';
import { format } from 'date-fns'
import CalendarHideable from './CalendarHideable';
import { pushNewActivity } from '../App';



const MyActionFields = (props) => {
  const [actionType, setActionType] = useState('');
  const [actionAmount, setActionAmount] = useState('');
  const [actionDate, setActionDate] = useState(format(new Date(), 'dd-MM-yyyy'));  // change!
  const [actionPerson, setActionPerson] = useState('');

  function setToDefault() {
    setActionType('');
    setActionAmount('');
    setActionPerson('');
  }
  function sendActionsToDb(event) {
    event.preventDefault();
    const newActivity = { "date": actionDate, "time": format(new Date(), 'HH:mm:ss'), "type": actionType, "person": actionPerson, "amount": actionAmount };
    pushNewActivity(props.code, JSON.stringify(newActivity));
    setToDefault();
  }
  return (
    <div className="fields-action">
      <form onSubmit={sendActionsToDb}>
        <label className="label">Тип события</label>
        <input className="input" type="text" value={actionType} placeholder="Выберите или введите тип события" name="type" list="typeList" onChange={event => setActionType(event.target.value.trim())} />
        <datalist id="typeList">
          <option value="">Выбрать тип</option>
          <option value="Заморозка">Заморозка</option>
          <option value="Продажа">Продажа</option>
          <option value="Посещение">Посещение</option>
          <option value="ПТ">ПТ</option>
          <option value="Минигруппа">Минигруппа</option>
          <option value="Шкафчик">Шкафчик</option>
          <option value="Парковка">Парковка</option>
        </datalist>
        <div>
          <label className="label">Данные события</label>
          <input className="input" type="text" placeholder="Введите текст или сумму" onChange={event => setActionAmount(event.target.value)} value={actionAmount} />
        </div>
        <div>
          <label className="label">Клиент/сотрудник</label>
          <input className="input" type="text" value={actionPerson} placeholder="Выберите сотрудника/клиента" list="personList" onChange={event => setActionPerson(event.target.value)} />
          <datalist id="personList">
            <option value="">Выбрать тренера</option>
            {props.namesArr.map((person) =>
              <option key={person} value={person}>{person}</option>)}
          </datalist>
        </div>
        <CalendarHideable setParentDate={setActionDate} сalendarName="Дата события:" dateType="setParent" date={actionDate} />
        <button className="button" type="submit">Добавить событие</button>
      </form>
    </div>
  );
}



export default MyActionFields;