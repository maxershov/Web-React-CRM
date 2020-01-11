import React, { useState, useEffect } from 'react';
import { ChangeProfileValue, addNewDayDataToJSON } from '../App';
import { getStoreId } from '../store/storeGetters';


const MyTextArea = (props) => {
  const [notesData, setNotesData] = useState(props.notesValue);

  const saveNotes = (event) => {
    if (event.key === 'Enter' || event.target.id === 'clickNotes') {
      if (props.type === 'PERSON') {
        ChangeProfileValue(getStoreId(), notesData, "notes")
      } else if (props.type === 'DAY_DATA') {
        props.dayObject.notes = notesData;
        addNewDayDataToJSON(props.dayObject);
      } else {
        console.log('ERROR IN NOTES ' + notesData);
      }
    }
  }
  useEffect(() => {
    setNotesData(props.notesValue);
  }, [props.notesValue]);
  return (
    <>
      <textarea onChange={event => setNotesData(event.target.value)} onKeyDown={saveNotes} value={notesData}></textarea>
      <button id="clickNotes" onClick={saveNotes}>Изменить</button>
    </>
  )
}

export default MyTextArea;