/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable spaced-comment */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getPhotoFunc, deletePerson } from '../App';
import { getStoreId } from '../store/storeGetters';
import FormData from './FormData';
import CalendarHideable from './CalendarHideable';
import FieldDeposite from './FieldDeposite';
import FieldsAction from './FieldsAction';
import TableHistory from './TableHistory';
import AreaNotes from './AreaNotes';


function getPersonNames(data) {
  return data.map(obj => { return obj.personName });
}

const UserPage = (props) => {
  /** Show fields with User data and change it on submit*/
  const [renderPhotoId, changeRenderPhotoId] = useState(false);
  const id = getStoreId();
  const data = JSON.parse(props.personData);


  let renderFields = '';
  if (data[id].contract === 'ЛИД') { renderFields = <LeadParams data={data} id={id} /> }
  else if (data[id].contract === 'СОТРУДНИК') { renderFields = <EmployeeParams data={data} id={id} /> }
  else if (data[id].contract === 'НЕТ') { renderFields = <LostPersonParams data={data} id={id} /> }
  else { renderFields = <PersonParams data={data} id={id} /> }


  return (
    <div className="userPage">
      <div className="img-container"><img onClick={() => changeRenderPhotoId(!renderPhotoId)} alt="profilePhoto" src={getPhotoFunc(data[id].photoId)} /></div>
      <div className="userPage-container">
        {renderPhotoId ? (
          <>
            <FormData className="photoId" formLabel="Изменить код фото:" baseValue={data[id].photoId} inputType="photoId" type="PERSON" />
            <label>Удаление:</label>
            <button type="button" onClick={() => deletePerson(data[id].code)}>Удалить пользователя</button>
          </>
        ) : undefined}
        <FormData formLabel="Имя:" baseValue={data[id].personName} inputType="personName" type="PERSON" />
        <FormData formLabel="Номер телефона:" baseValue={data[id].telNum} inputType="telNum" type="PERSON" />
        {renderFields}
      </div>
      <div className="notesField">
        <label>Заметки:</label>
        <AreaNotes notesValue={data[id].notes} type="PERSON" />
      </div>
      <FieldsAction code={data[id].code} namesArr={getPersonNames(data)} />
      <TableHistory tableDataType="personData" code={data[id].code} />
    </div>
  );
}

const PersonParams = (props) => {
  const { data, id } = props;
  return (
    <>
      <FormData formLabel="Дата рождения:" baseValue={data[id].dateBirth} inputType="dateBirth" type="PERSON" />
      <FormData formLabel="Абонемент:" baseValue={data[id].contract} inputType="contract" type="PERSON" />
      <FormData formLabel="Остаток тренировок:" baseValue={data[id].remain} inputType="remain" type="PERSON" />
      <FormData formLabel="Код карты:" baseValue={data[id].code} inputType="code" type="PERSON" />
      <FormData formLabel="Месяц парковки:" baseValue={data[id].autoMonth} inputType="autoMonth" type="PERSON" />
      <CalendarHideable сalendarName="Срок контракта:" dateType="days" date={data[id].days} />
      <CalendarHideable сalendarName="Срок аренды шкафа:" dateType="rent" date={data[id].rent} />
      <FieldDeposite depositeValue={data[id].deposite} />
    </>
  )
}


const LeadParams = (props) => {
  const { data, id } = props;
  return (
    <>
      <FormData formLabel="Тип профиля:" baseValue={data[id].contract} inputType="contract" type="PERSON" />
      <CalendarHideable сalendarName="Дата первого обращения:" dateType="rent" date={data[id].rent} />
    </>
  )
}

const LostPersonParams = (props) => {
  const { data, id } = props;
  return (
    <>
      <FormData formLabel="Тип профиля:" baseValue={data[id].contract} inputType="contract" type="PERSON" />
      <FormData formLabel="Дата рождения:" baseValue={data[id].dateBirth} inputType="dateBirth" type="PERSON" />
      <FormData formLabel="Код карты:" baseValue={data[id].code} inputType="code" type="PERSON" />
      <FieldDeposite depositeValue={data[id].deposite} />
      <CalendarHideable сalendarName="Дата окончания контракта:" dateType="days" date={data[id].days} />
    </>
  )
}


const EmployeeParams = (props) => {
  const { data, id } = props;
  return (
    <>
      <FormData formLabel="Дата рождения:" baseValue={data[id].dateBirth} inputType="dateBirth" type="PERSON" />
      <FormData formLabel="Тип профиля:" baseValue={data[id].contract} inputType="contract" type="PERSON" />
      <FormData formLabel="Код карты:" baseValue={data[id].code} inputType="code" type="PERSON" />
      <FormData formLabel="Парковка оплачена до:" baseValue={data[id].autoMonth} inputType="autoMonth" type="PERSON" />
      <FieldDeposite depositeValue={data[id].deposite} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    personData: state.personStore.data
  }
}

export default connect(mapStateToProps)(UserPage);