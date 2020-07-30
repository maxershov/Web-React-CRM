/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'preact/compat';
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { format, parse } from 'date-fns'
import ReactTable from 'react-table-6/react-table.min';
import Calendar from 'react-calendar/dist/entry.nostyle';
import AreaNotes from './AreaNotes';
import CodeScanner from './CodeScanner'
import ProfileCreator from "./ProfileCreator";
import { getIndexByCode, getDateObj } from '../App';



function isToday(date) {
  const todayDate = format(new Date(), 'dd-MM-yyyy')
  return todayDate === date;
}


export const MainPage = (props) => {
  const history = useHistory();
  const personData = JSON.parse(props.personData);
  const [loadedDate, setLoadedDate] = useState(format(new Date(), 'dd-MM-yyyy'));
  const data = JSON.parse(getDateObj(loadedDate));
  const [widthCoeff, setWidthCoeff] = useState(window.innerWidth / 100);
  document.title = `${loadedDate} CRM`;

  const changeLoadDate = (date) => {
    const formattedDate = format(date, 'dd-MM-yyyy');
    setLoadedDate(formattedDate);
  }

  function getPhotoId(code) {
    return personData[getIndexByCode(code)].photoId
  }

  function handleResize() {
    setWidthCoeff(window.innerWidth / 100);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <>
      <div className="mainPage">
        <Calendar className="calendar calendar--main" value={parse(loadedDate, 'dd-MM-yyyy', new Date())} onChange={(date) => changeLoadDate(date)} />
        <div className="mainPage-notes"><AreaNotes notesValue={data.notes} type="DAY_DATA" dayObject={data} /></div>
        {isToday(loadedDate) ? (
          <>
            <CodeScanner dayObject={data} date={loadedDate} />
            <ProfileCreator route={history} />
          </>
        ) : (
            undefined
          )}
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
              width: widthCoeff * 10,
              accessor: 'code',
              headerClassName: 'table__header',
              Cell: ({ value }) => (
                <input
                  className="person-img"
                  type="image"
                  alt="tablePhoto"
                  onClick={() => history.push(`/profile/${value}`)}
                  src={require(`../images/${getPhotoId(value)}.jpg`)}
                />
              )
            },
            {
              Header: 'Имя',
              accessor: 'code',
              width: widthCoeff * 60,
              headerClassName: 'table__header',
              style: { whiteSpace: 'unset' },
              Cell: ({ value }) => (<Link to={`/profile/${value}`}>{personData[getIndexByCode(value)].personName}</Link>)
            },
            {
              Header: 'Время',
              width: widthCoeff * 30,
              accessor: 'time',
              headerClassName: 'table__header',
            }]}
          defaultSorted={[{
            id: 'time',
            desc: true
          }]}
          defaultPageSize={10}
        />
      </div>
      <div className="footer">
        <a href="https://github.com/maxershov" className="authorLink">Max Ershov<br />2020</a>
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