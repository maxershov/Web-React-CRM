import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import moment from 'moment';
import ReactTable from 'react-table-6/react-table.min';
import Calendar from 'react-calendar/dist/entry.nostyle';
import AreaNotes from './AreaNotes';
import CodeScanner from './CodeScanner'

import FormData from './FormData';
import { getPhotoFunc, getIndexByCode, getDateObj  } from '../App';


// set width to table colums by .className size
function widthForTable(value) {
  return Math.round(window.innerWidth * (value / 100))
}

export const MainPage = (props) => {
  const history = useHistory();
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
        <h1 className="askPhoneTurn font_white_shadow">Rotate screen to landscape mode<br />⤵</h1>
        <Calendar className="calendar calendarMain" value={moment(loadedDate, 'DD-MM-YYYY').toDate()} onChange={(date) => changeLoadDate(date)} />
        <div className="notesMain"><AreaNotes notesValue={data.notes} type="DAY_DATA" dayObject={data} /></div>
        <div className="newProfileField"><FormData baseValue="" formLabel="Новый профиль:" type="NEW_PERSON" route={history} /></div>
        <div className="newCodeField"><CodeScanner dayObject={data} date={loadedDate} /></div>
      </div>
      <div className="tableMain">
        <ReactTable
          className="table -striped -highlight"
          previousText="Назад"
          nextText="Вперед"
          loadingText="Загрузка"
          noDataText="Нет данных"
          pageText="Страница"
          ofText="из"
          rowsText="профилей"
          data={data.history}
          columns={[
            {
              Header: 'Фото',
              width: widthForTable(20),
              accessor: 'code',
              headerClassName: 'tableHeader',
              Cell: ({ value }) => (
                <button type="button" onClick={() => history.push(`/profile/${  value}`)}><img id="tablePhoto" alt="tablePhoto" height={80} src={getPhotoFunc(personData[getIndexByCode(value)].photoId)} /></button>)
            },
            {
              Header: 'Имя',
              accessor: 'code',
              width: widthForTable(60),
              headerClassName: 'tableHeader',
              style: { whiteSpace: 'unset' },
              Cell: ({value}) => (<Link to={`/profile/${value}`}>{personData[getIndexByCode(value)].personName}</Link>)
            },
            {
              Header: 'Время',
              width: widthForTable(20),
              accessor: 'time',
              headerClassName: 'tableHeader',
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

export default connect(mapStateToProps)(MainPage);