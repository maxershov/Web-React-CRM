import React, { useState, useEffect } from 'preact/compat';
import { useParams } from 'react-router-dom';
import { ChangeProfileValue, addNewDayDataToJSON } from '../App';


const AreaNotes = (props) => {
  const { notesValue, type, dayObject } = props;
  const [notesData, setNotesData] = useState(notesValue);
  const { codeLink } = useParams();

  const saveNotes = (event) => {
    if (event.key === 'Enter' || event.target.id === 'clickNotes') {
      if (type === 'PERSON') {
        ChangeProfileValue(codeLink, notesData, "notes")
      } else if (type === 'DAY_DATA') {
        dayObject.notes = notesData;
        addNewDayDataToJSON(dayObject);
      }
    }
  }
  useEffect(() => {
    setNotesData(notesValue);
  }, [notesValue]);
  return (
    <>
      <label className="label">Заметки</label>
      <textarea className="notes" onChange={event => setNotesData(event.target.value)} onKeyDown={saveNotes} value={notesData} />
      <button className="button notes__button" type="button" onClick={saveNotes}>Изменить</button>
    </>
  )
}

export default AreaNotes;