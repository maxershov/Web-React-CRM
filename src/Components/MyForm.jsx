import React, { useState } from 'react';
import { ChangeProfileValue, addNewPersonToJSON } from '../App';
import { getStoreId } from '../store/storeGetters';

const MyForm = (props) => {
  const [inputValue, setValue] = useState(props.baseValue);
  const placeholder = `Добавить ${  props.formLabel.slice(0, -1).toLowerCase()}`;
  const sendToDb = (event) => {
    event.preventDefault();
    if (props.type === 'PERSON') ChangeProfileValue(getStoreId(), inputValue, props.inputType);
    if (props.type === 'NEW_PERSON') {
      addNewPersonToJSON(inputValue, true);
    }
  }
  return (
    <div className={`${props.inputType}Field absolute_position_button`}>
      <form name="myForm" onSubmit={sendToDb}><label>{props.formLabel}</label>
        <input placeholder={placeholder} type="text" name={props.inputType} onChange={event => setValue(event.target.value)} value={inputValue} />
        <button type="submit">Изменить</button>
      </form></div>);
}



export default MyForm;