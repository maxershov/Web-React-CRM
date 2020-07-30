import React, { useState } from 'preact/compat';
import { format } from 'date-fns'
import { useParams } from 'react-router-dom';
import CalendarHideable from './CalendarHideable';
import { ChangeProfileValue } from '../App';


const FieldDeposite = (props) => {
  const { codeLink } = useParams();
  const [renderDeposite, changeRenderDeposite] = useState(false);
  const [amount, setAmount] = useState('');
  const [deposite, setDeposite] = useState(props.depositeValue);
  const [dateDeposite, setDateDeposite] = useState(format(new Date(), 'dd-MM-yyyy'))

  const plus = () => {
    const sum = +deposite + +amount;
    setDeposite(sum);
    changeRenderDeposite(false);
    ChangeProfileValue(codeLink, sum, 'deposite', dateDeposite);
  }

  const minus = () => {
    const sum = +deposite - +amount;
    setDeposite(sum);
    changeRenderDeposite(false);
    ChangeProfileValue(codeLink, sum, 'deposite', dateDeposite)
  }

  return (
    renderDeposite ?
      (
        <>
          <form>
            <label className="label">Сумма списания/пополнения</label>
            <br />
            <input className="input" type="number" width="40" height="50" value={amount} onChange={event => setAmount(event.target.value)} />
            <div className="one-line-wrapper">
              <button className="button block-button" type="button" onClick={plus}>+</button>
              <button className="button block-button" type="button" onClick={() => changeRenderDeposite(false)}>ЗАКРЫТЬ</button>
              <button className="button block-button" type="button" onClick={minus}>-</button>
            </div>
          </form>
          <CalendarHideable setParentDate={setDateDeposite} сalendarName="Дата изменения депозита:" dateType="setParent" date={dateDeposite} />
        </>
      )
      :
      (
        <>
          <form onSubmit={() => changeRenderDeposite(true)}>
            <label className="label">Депозит</label>
            <input className="input" onClick={() => changeRenderDeposite(true)} type="number" readOnly value={deposite} />
          </form>
        </>
      )
  );
}

export default FieldDeposite;