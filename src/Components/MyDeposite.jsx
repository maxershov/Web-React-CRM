import React, { useState } from 'react';
import moment from 'moment';
import MyCalendarWithButtons from './MyCalendarWithButtons';
import { ChangeProfileValue } from '../App';
import { getStoreId } from '../store/storeGetters';

const MyDeposite = (props) => {
  const [renderDeposite, changeRenderDeposite] = useState(false);
  const [amount, setAmount] = useState('');
  const [deposite, setDeposite] = useState(props.depositeValue);
  const [dateDeposite, setDateDeposite] = useState(moment(new Date()).format('DD-MM-YYYY'))

  const plus = () => {
    const sum = Number(deposite) + Number(amount);
    setDeposite(sum);
    changeRenderDeposite(false);
    ChangeProfileValue(getStoreId(), sum, 'deposite', dateDeposite);
  }

  const minus = () => {
    const sum = Number(deposite) - Number(amount);
    setDeposite(sum);
    changeRenderDeposite(false);
    ChangeProfileValue(getStoreId(), sum, 'deposite', dateDeposite)
  }
  
  return (
    renderDeposite ?
      (
        <div className="depositeField">
          <form>
            <label>Сумма списания/пополнения:</label>
            <br />
            <input className="numInput" type="number" width="40" height="50" value={amount} onChange={event => setAmount(event.target.value)} />
            <button type="button" style={{ float: "left", height: "30px", width: "50px" }} onClick={plus}>+</button>
            <button type="button" style={{ float: "left", height: "30px", width: "50px" }} onClick={minus}>-</button>
          </form>
          <MyCalendarWithButtons setParentDate={setDateDeposite} сalendarName="Дата изменения депозита:" dateType="setParent" date={dateDeposite} />
        </div>
)
      :
      (
        <div className="depositeField">
          <form onSubmit={() => changeRenderDeposite(true)}>
            <label>Депозит:</label>
            <input onClick={() => changeRenderDeposite(true)} type="number" readOnly value={deposite} />
          </form>
        </div>
)
  );
}

export default MyDeposite;