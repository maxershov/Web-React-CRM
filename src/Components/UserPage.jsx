/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
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



  let renderFields = '';
  if (person.contract === 'ЛИД') { renderFields = <LeadParams person={person} /> }
  else if (person.contract === 'СОТРУДНИК') { renderFields = <EmployeeParams person={person} /> }
  else if (person.contract === 'НЕТ') { renderFields = <LostPersonParams person={person} /> }
  else { renderFields = <PersonParams person={person} /> }

  return (
    <div className="userPage">
      <div className="img-container"><img onClick={() => changeRenderPhotoId(!renderPhotoId)} alt="profilePhoto" src={require(`../images/${person.photoId}.jpg`)} /></div>
      <div className="userPage-container">
        {renderPhotoId ? (
          <>
            <FormData className="photoId" formLabel="Изменить код фото:" baseValue={person.photoId} inputType="photoId" type="PERSON" />
            <label>Удаление:</label>
            <button type="button" onClick={() => deletePerson(person.code)}>Удалить пользователя</button>
          </>
        ) : undefined}
        <FormData formLabel="Имя:" baseValue={person.personName} inputType="personName" type="PERSON" />
        <FormData formLabel="Номер телефона:" baseValue={person.telNum} inputType="telNum" type="PERSON" />
        {renderFields}
      </div>
      <div className="notesField">
        <label>Заметки:</label>
        <AreaNotes notesValue={person.notes} type="PERSON" />
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
      <FormData formLabel="Дата рождения:" baseValue={person.dateBirth} inputType="dateBirth" type="PERSON" />
      <FormData formLabel="Абонемент:" baseValue={person.contract} inputType="contract" type="PERSON" />
      <FormData formLabel="Остаток тренировок:" baseValue={person.remain} inputType="remain" type="PERSON" />
      <FormData formLabel="Код карты:" baseValue={person.code} inputType="code" type="PERSON" />
      <FormData formLabel="Месяц парковки:" baseValue={person.autoMonth} inputType="autoMonth" type="PERSON" />
      <CalendarHideable сalendarName="Срок контракта:" dateType="days" date={person.days} />
      <CalendarHideable сalendarName="Срок аренды шкафа:" dateType="rent" date={person.rent} />
      <FieldDeposite depositeValue={person.deposite} />
    </>
  )
}


export const LeadParams = (props) => {
  const { person } = props;
  return (
    <>
      <FormData formLabel="Тип профиля:" baseValue={person.contract} inputType="contract" type="PERSON" />
      <CalendarHideable сalendarName="Дата первого обращения:" dateType="rent" date={person.rent} />
    </>
  )
}

export const LostPersonParams = (props) => {
  const { person } = props;
  return (
    <>
      <FormData formLabel="Тип профиля:" baseValue={person.contract} inputType="contract" type="PERSON" />
      <FormData formLabel="Дата рождения:" baseValue={person.dateBirth} inputType="dateBirth" type="PERSON" />
      <FormData formLabel="Код карты:" baseValue={person.code} inputType="code" type="PERSON" />
      <FieldDeposite depositeValue={person.deposite} />
      <CalendarHideable сalendarName="Дата окончания контракта:" dateType="days" date={person.days} />
    </>
  )
}


export const EmployeeParams = (props) => {
  const { person } = props;
  return (
    <>
      <FormData formLabel="Дата рождения:" baseValue={person.dateBirth} inputType="dateBirth" type="PERSON" />
      <FormData formLabel="Тип профиля:" baseValue={person.contract} inputType="contract" type="PERSON" />
      <FormData formLabel="Код карты:" baseValue={person.code} inputType="code" type="PERSON" />
      <FormData formLabel="Парковка оплачена до:" baseValue={person.autoMonth} inputType="autoMonth" type="PERSON" />
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