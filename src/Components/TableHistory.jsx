import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import { connect } from 'react-redux';
import { getDaysLeft } from '../App';

// set classname to headers => in css set word-wrap for small screens 
const columnDefaults = { ...ReactTableDefaults.column, headerClassName: 'tableHeader' }

// set width to table colums by .className size
function widthForTable(value) {
  return Math.round(window.innerWidth * (value / 100))
}

const TableHistory = (props) => {
  const parsedData = JSON.parse(props.activityData).filter(obj => { return obj.code === props.code });

  return (
    <div className="tableHistory">
      <ReactTable
        className="table font_white_shadow -striped -highlight"
        previousText="Назад"
        nextText="Вперед"
        loadingText="Загрузка"
        noDataText="Нет данных"
        pageText="Страница"
        ofText="из"
        rowsText="профилей"
        data={parsedData[0].activity}
        column={columnDefaults}
        columns={[{
          Header: 'Тип',
          accessor: 'type',
          style: { whiteSpace: 'unset' },
          width: widthForTable(20)
        }, {
          Header: 'Дата',
          accessor: 'date',
          width: widthForTable(10),
          sortMethod: (a, b) => {
            const dayA = getDaysLeft(a);
            const dayB = getDaysLeft(b);
            return (dayA === null) - (dayB === null) || +(dayA > dayB) || -(dayA < dayB);
          }
        }, {
          Header: 'Время',
          width: widthForTable(10),
          accessor: 'time'
        }, {
          Header: 'Имя',
          accessor: 'person',
          style: { whiteSpace: 'unset' },
          width: widthForTable(20)
        }, {
          Header: 'Значение',
          accessor: 'amount',
          width: widthForTable(40),
          style: { 'whiteSpace': 'unset' }
        }]}
        defaultSorted={[{ id: 'date', desc: true }]}
        defaultPageSize={10}
      />
    </div>
  )
}


const mapStateToProps = state => {
  return {
    activityData: state.activityStore.data
  }
}

export default connect(mapStateToProps)(TableHistory);