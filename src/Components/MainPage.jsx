import React, { useState } from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import CodeScanner from './CodeScanner'
import AreaNotes from './AreaNotes';
import { getPhotoFunc, renderPersonFunc, getIndexByCode, getDateObj } from '../App';
import FormData from './FormData';


const MainPage = (props) => {
  const personData = JSON.parse(props.personData);
  const [loadedDate, setLoadedDate] = useState(moment(new Date()).format('DD-MM-YYYY'));
  const data = JSON.parse(getDateObj(loadedDate));
  const changeLoadDate = (date) => {
    const formatedDate = moment(date).format('DD-MM-YYYY');
    setLoadedDate(formatedDate);
  }
  return (
    <>
      <div className="mainPage">
        <Calendar className="calendar calendarMain" value={moment(loadedDate, 'DD-MM-YYYY').toDate()} onChange={(date) => changeLoadDate(date)} />
        <div className="notesMain"><AreaNotes notesValue={data.notes} type="DAY_DATA" dayObject={data} cols="80" rows="10" /></div>
        <div className="newProfileField"><FormData baseValue="" formLabel="Новый профиль:" type="NEW_PERSON" /></div>
        <div className="newCodeField"><CodeScanner dayObject={data} date={loadedDate} /></div>
      </div>
      <div className="tableMain">
        <ReactTable
          className="table -striped -highlight"
          data={data.history}
          columns={[
          {
            Header: () => <strong>Фото</strong>,
            id: 'photo',
            headerClassName: 'photoTable',
            width: 200,
            Cell: (value) => (
              <div><img height={60} alt="personPhoto" src={getPhotoFunc(personData[getIndexByCode(value.original.code)].photoId)} /></div>)
          },
          {
            Header: () => <strong>Имя</strong>,
            id: 'name',
            headerClassName: 'nameTable',
            width: 430,
            style: { whiteSpace: 'unset' },
            Cell: (value) => (personData[getIndexByCode(value.original.code)].personName)
          },
          {
            Header: () => <strong>Время</strong>,
            width: 100,
            headerClassName: 'timeTable',
            accessor: 'time'
          }, {
            Header: () => '',
            accessor: 'code',
            width: 55,
            headerClassName: 'codeTable',
            getFooterProps: () => ({ style: { background: 'blue' } }),
            Cell: (value) => (<button type="button" onClick={() => renderPersonFunc(value.original.code)}><img width={30} height={30} alt="editImg" src={openProfileImg} /></button>)
          }]}
          defaultSorted={[{
          id: 'time',
          desc: true
        }]}
          defaultPageSize={5}
        />

      </div>
    </>
  );
}


const mapStateToProps = state => {
  return {
    personData: state.personStore.data,
    dayData: state.dayDataStore.data
  }
}

// export default MainPage;
export default connect(mapStateToProps)(MainPage);