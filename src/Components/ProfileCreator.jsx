import React, { useState } from 'preact/compat';
import { addNewPersonToJSON } from '../App';


const ProfileCreator = React.memo(props => {

  const [code, setCode] = useState('');

  const enterCode = (event) => {
    event.preventDefault();
    const codeSaved = code;
    setCode(''); // clear codeField
    addNewPersonToJSON(code, false);
    props.route.push(`/profile/${codeSaved.replace(/ /g, '')}`)
  }

  return (
    <div className="profile-creator">
      <label className="label">Создать профиль</label>
      <form className="code-form" name="codeForm" onSubmit={enterCode}>
        <input className="input code-form__input" required minLength={4} placeholder=" Введите данные" type="text" name="PROFILE" onChange={event => setCode(event.target.value.trim())} value={code} />
        <button className="input code-form__button" type="submit">СОЗДАТЬ</button>
      </form>
    </div >
  );
});


export default ProfileCreator;