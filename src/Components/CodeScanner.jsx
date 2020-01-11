/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import moment from 'moment';
import { addNewDayDataToJSON, addNewPersonToJSON } from '../App';
import { getPersonStore } from '../store/storeGetters'


function addToTodayHistory(code, dayObject) {
    const codeObj = { "code": code, "time": moment(new Date()).format('HH:mm:ss') };
    dayObject.history.push(codeObj);
    addNewDayDataToJSON(dayObject);
}


function handleNewCode(code, dayObject, date) {
    const personData = JSON.parse(getPersonStore());
    const index = personData.findIndex(person => person.code === code);
    // TODO find if already in history..

    if (index === -1) {
        addNewPersonToJSON(code, false);
        addToTodayHistory(code, dayObject);
    } else {
        addToTodayHistory(personData[index].code, dayObject);
    }
}

const CodeScanner = (props) => {
    const [code, setCode] = useState('');
    const enterCode = (event) => {
        event.preventDefault();
        const codeDb = code;
        setCode(''); // clear codeField
        handleNewCode(codeDb, props.dayObject, props.date);
    }
    return (
      <>
        <label>Сканер карт:</label>
        <form name="codeForm" onSubmit={enterCode}>
          <input required minLength={5} placeholder="Нажмите на поле и прислоните карту" type="text" name={props.inputType} onChange={event => setCode(event.target.value)} value={code} />
        </form>
      </>
    );
}

export default CodeScanner;