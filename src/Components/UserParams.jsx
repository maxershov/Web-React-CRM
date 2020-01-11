/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable spaced-comment */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getPhotoFunc, deletePerson } from '../App';
import { getStoreId } from '../store/storeGetters';
import MyForm from './MyForm';
import MyCalendarWithButtons from './MyCalendarWithButtons';
import MyDeposite from './MyDeposite';
import MyActionFields from './MyActionFields';
import HistoryTable from './HistoryTable';
import MyTextArea from './MyTextArea';


function getPersonNames(data) {
  return data.map(obj => { return obj.personName });
}

const UserParams = (props) => {
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
    <div className="userParams">
      <div className="img-container"><img onClick={() => changeRenderPhotoId(!renderPhotoId)} alt="profilePhoto" src={getPhotoFunc(data[id].photoId)} /></div>
      <div className="userParams-container">
        {renderPhotoId ? (
          <>
            <MyForm className="photoId" formLabel="Изменить код фото:" baseValue={data[id].photoId} inputType="photoId" type="PERSON" />
            <label>Удаление:</label>
            <button type="button" onClick={() => deletePerson(data[id].code)}>Удалить пользователя</button>
          </>
        ) : undefined}
        <MyForm formLabel="Имя:" baseValue={data[id].personName} inputType="personName" type="PERSON" />
        <MyForm formLabel="Номер телефона:" baseValue={data[id].telNum} inputType="telNum" type="PERSON" />
        {renderFields}
      </div>
      <div className="notesField">
        <label>Заметки:</label>
        <MyTextArea notesValue={data[id].notes} type="PERSON" />
      </div>
      <MyActionFields code={data[id].code} namesArr={getPersonNames(data)} />
      <HistoryTable tableDataType="personData" code={data[id].code} />
    </div>
  );
}

const PersonParams = (props) => {
  const { data, id } = props;
  return (
    <>
      <MyForm formLabel="Дата рождения:" baseValue={data[id].dateBirth} inputType="dateBirth" type="PERSON" />
      <MyForm formLabel="Абонемент:" baseValue={data[id].contract} inputType="contract" type="PERSON" />
      <MyForm formLabel="Остаток тренировок:" baseValue={data[id].remain} inputType="remain" type="PERSON" />
      <MyForm formLabel="Код карты:" baseValue={data[id].code} inputType="code" type="PERSON" />
      <MyForm formLabel="Месяц парковки:" baseValue={data[id].autoMonth} inputType="autoMonth" type="PERSON" />
      <MyCalendarWithButtons сalendarName="Срок контракта:" dateType="days" date={data[id].days} />
      <MyCalendarWithButtons сalendarName="Срок аренды шкафа:" dateType="rent" date={data[id].rent} />
      <MyDeposite depositeValue={data[id].deposite} />
    </>
  )
}


const LeadParams = (props) => {
  const { data, id } = props;
  return (
    <>
      <MyForm formLabel="Тип профиля:" baseValue={data[id].contract} inputType="contract" type="PERSON" />
      <MyCalendarWithButtons сalendarName="Дата первого обращения:" dateType="rent" date={data[id].rent} />
    </>
  )
}

const LostPersonParams = (props) => {
  const { data, id } = props;
  return (
    <>
      <MyForm formLabel="Тип профиля:" baseValue={data[id].contract} inputType="contract" type="PERSON" />
      <MyForm formLabel="Дата рождения:" baseValue={data[id].dateBirth} inputType="dateBirth" type="PERSON" />
      <MyForm formLabel="Код карты:" baseValue={data[id].code} inputType="code" type="PERSON" />
      <MyDeposite depositeValue={data[id].deposite} />
      <MyCalendarWithButtons сalendarName="Дата окончания контракта:" dateType="days" date={data[id].days} />
    </>
  )
}


const EmployeeParams = (props) => {
  const { data, id } = props;
  return (
    <>
      <MyForm formLabel="Дата рождения:" baseValue={data[id].dateBirth} inputType="dateBirth" type="PERSON" />
      <MyForm formLabel="Тип профиля:" baseValue={data[id].contract} inputType="contract" type="PERSON" />
      <MyForm formLabel="Код карты:" baseValue={data[id].code} inputType="code" type="PERSON" />
      <MyForm formLabel="Парковка оплачена до:" baseValue={data[id].autoMonth} inputType="autoMonth" type="PERSON" />
      <MyDeposite depositeValue={data[id].deposite} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    personData: state.personStore.data
  }
}

export default connect(mapStateToProps)(UserParams);