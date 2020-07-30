/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
import React, { useState } from 'preact/compat';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { deletePerson } from '../App';
import FormData from './FormData';
import CalendarHideable from './CalendarHideable';
import FieldDeposite from './FieldDeposite';
import FieldsAction from './FieldsAction';
import TableHistory from './TableHistory';
import AreaNotes from './AreaNotes';


function getAllPersonNames(data) {
  return data.map(obj => { return obj.personName });
}

export const UserPage = (props) => {
  /** Show fields with User data and change it on submit */
  const [renderPhotoId, changeRenderPhotoId] = useState(false);
  const { codeLink } = useParams();
  const history = useHistory();


  const data = JSON.parse(props.personData);

  let person = data.find(profile => {
    return profile.code === codeLink
  })

  if (person === undefined) {
    // TODO kill this CRAP => prevent from crash if unvalid code in URL path
    [person,] = data;
    history.push('/main');
  }
  document.title = person.personName;


  let renderFields = '';
  if (person.contract === 'ЛИД') { renderFields = <LeadParams person={person} /> }
  else if (person.contract === 'СОТРУДНИК') { renderFields = <EmployeeParams person={person} /> }
  else if (person.contract === 'НЕТ') { renderFields = <LostPersonParams person={person} /> }
  else { renderFields = <PersonParams person={person} /> }

  return (
    <div className="userPage">
      <div className="img-container"><input className="person-img" type="image" onClick={() => changeRenderPhotoId(!renderPhotoId)} alt="profilePhoto" src={require(`../images/${person.photoId}.jpg`)} /></div>
      <div className="userPage-container">
        {renderPhotoId ? (
          <>
            <FormData className="photoId" formLabel="Изменить код фото" baseValue={person.photoId} inputType="photoId" />
            <label className="label">Удаление</label>
            <button className="button" type="button" onClick={() => deletePerson(person.code)}>Удалить пользователя</button>
          </>
        ) : undefined}
        <FormData formLabel="Имя" baseValue={person.personName} inputType="personName" />
        <FormData formLabel="Номер телефона" baseValue={person.telNum} inputType="telNum" />
        {renderFields}
      </div>
      <div className="userPage__notes">
        <AreaNotes notesValue={person.notes} />
      </div>
      <FieldsAction code={person.code} namesArr={getAllPersonNames(data)} />
      <TableHistory tableDataType="personData" code={person.code} />
    </div>
  );
}

export const PersonParams = (props) => {
  const { person } = props;
  return (
    <>
      <FormData formLabel="Дата рождения" baseValue={person.dateBirth} inputType="dateBirth" />
      <FormData formLabel="Абонемент" baseValue={person.contract} inputType="contract" />
      <FormData formLabel="Остаток тренировок" baseValue={person.remain} inputType="remain" />
      <FormData formLabel="Код карты" baseValue={person.code} inputType="code" />
      <FormData formLabel="Месяц парковки" baseValue={person.autoMonth} inputType="autoMonth" />
      <CalendarHideable сalendarName="Срок контракта" dateType="days" date={person.days} />
      <CalendarHideable сalendarName="Срок аренды шкафа" dateType="rent" date={person.rent} />
      <FieldDeposite depositeValue={person.deposite} />
    </>
  )
}


export const LeadParams = (props) => {
  const { person } = props;
  return (
    <>
      <FormData formLabel="Тип профиля" baseValue={person.contract} inputType="contract" />
      <CalendarHideable сalendarName="Дата первого обращения" dateType="rent" date={person.rent} />
    </>
  )
}

export const LostPersonParams = (props) => {
  const { person } = props;
  return (
    <>
      <FormData formLabel="Тип профиля" baseValue={person.contract} inputType="contract" />
      <FormData formLabel="Дата рождения" baseValue={person.dateBirth} inputType="dateBirth" />
      <FormData formLabel="Код карты" baseValue={person.code} inputType="code" />
      <FieldDeposite depositeValue={person.deposite} />
      <CalendarHideable сalendarName="Дата окончания контракта" dateType="days" date={person.days} />
    </>
  )
}


export const EmployeeParams = (props) => {
  const { person } = props;
  return (
    <>
      <FormData formLabel="Дата рождения" baseValue={person.dateBirth} inputType="dateBirth" />
      <FormData formLabel="Тип профиля" baseValue={person.contract} inputType="contract" />
      <FormData formLabel="Код карты" baseValue={person.code} inputType="code" />
      <FormData formLabel="Парковка оплачена до" baseValue={person.autoMonth} inputType="autoMonth" />
      <FieldDeposite depositeValue={person.deposite} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    personData: state.personStore.data
  }
}

export default connect(mapStateToProps)(UserPage);