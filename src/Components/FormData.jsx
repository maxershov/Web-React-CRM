import React, { useState } from 'preact/compat';
import { useParams } from 'react-router-dom';
import { ChangeProfileValue } from '../App';


const FormData = React.memo(props => {

  // Pass @route for last prop => to use history.push on input(MainPage - new Person) to open new profile
  const { formLabel, baseValue, inputType} = props;
  const { codeLink } = useParams();
  const [inputValue, setValue] = useState(baseValue);
  const [renderModal, setRenderModal] = useState(false);

  function askForChange() {
    if (baseValue !== inputValue) setRenderModal(true);
  }

  function closeModal() {
    setRenderModal(false);
    setValue(baseValue);
  }


  const sendToDb = (event) => {
    event.preventDefault();
    setRenderModal(false);
    ChangeProfileValue(codeLink, inputValue, inputType);
  }

  return (
    <div className="input-form">
      <form name="myForm" onSubmit={sendToDb}>
        <label className="label">{formLabel}</label>
        <input className="input input--hidable" placeholder={`Добавить ${formLabel.toLowerCase()}`} type="text" name={inputType} onChange={event => setValue(event.target.value.trim())} onBlur={askForChange} value={inputValue} />
      </form>
      {renderModal ? (
        <div className="modal">
          <p>Изменить:</p>
          <p>{baseValue} => {inputValue}</p>
          <div className="one-line-wrapper">
            <button className="button block-button" type="button" onClick={sendToDb}>ДА</button>
            <button className="button block-button" type="button" onClick={closeModal}>НЕТ</button>
          </div>
        </div>
      )
        : undefined}
    </div>
  );
});



export default FormData;