import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { getDaysLeft } from '../App';

const TableHistory = (props) => {
  const parsedData = JSON.parse(props.activityData).filter(obj => { return obj.code === props.code });

  return (
    <div className="tableHistory">
      <ReactTable
        previousText="Назад"
        nextText="Вперед"
        loadingText="Загрузка"
        noDataText="Нет данных"
        pageText="Страница"
        ofText="из"
        rowsText="профилей"
        className="table font_white_shadow -striped -highlight"
        data={parsedData[0].activity}
        columns={[{
          Header: () => <strong>Тип</strong>,
          accessor: 'type',
          headerClassName: 'typeTable',
          // width: 170
        }, {
          Header: () => <strong>Дата</strong>,
          accessor: 'date',
          headerClassName: 'dateTable',
          // width: 100,
          sortMethod: (a, b) => {
            const dayA = getDaysLeft(a);
            const dayB = getDaysLeft(b);
            return (dayA === null) - (dayB === null) || +(dayA > dayB) || -(dayA < dayB);
          }
        }, {
          Header: () => <strong>Время</strong>,
          // width: 100,
          headerClassName: 'timeTable',
          accessor: 'time'
        }, {
          Header: () => <strong>Имя</strong>,
          accessor: 'person',
          headerClassName: 'nameTable',
          // width: 220
        }, {
          Header: () => <strong>Значение</strong>,
          accessor: 'amount',
          headerClassName: 'amountTable',
          // width: 400,
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