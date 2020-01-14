/* eslint-disable react/prop-types */
import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import { connect } from 'react-redux';
import { getPhotoFunc, renderPersonFunc, getDaysLeft } from '../App';

// set classname to headers => in css set word-wrap for small screens 
const columnDefaults = { ...ReactTableDefaults.column, headerClassName: 'tableHeader' }

// set width to table colums by .className size
function widthForTable(value) {
  return Math.round(window.innerWidth * (value / 100))
}

const TablePageShort = (props) => {

  const leadObj = {
    Header: 'Дата первого контакта',
    accessor: 'rent',
    width: widthForTable(25),
    sortMethod: (a, b) => {
      const dayA = getDaysLeft(a);
      const dayB = getDaysLeft(b);
      return (dayA === null) - (dayB === null) || +(dayA > dayB) || -(dayA < dayB);
    }
  }
  const employeeObj = {
    Header: 'Депозит',
    width: widthForTable(25),
    accessor: 'deposite'
  }
  const lostObj = {
    Header: 'Срок действия последнего абонемента',
    accessor: 'days',
    width: widthForTable(25),
    sortMethod: (a, b) => {
      const dayA = getDaysLeft(a);
      const dayB = getDaysLeft(b);
      return (dayA === null) - (dayB === null) || +(dayA > dayB) || -(dayA < dayB);
    }
  }

  let tableRow = {};
  if (props.tableType === 'ЛИД') tableRow = leadObj;
  if (props.tableType === 'СОТРУДНИК') tableRow = employeeObj;
  if (props.tableType === 'НЕТ') tableRow = lostObj;


  return (
    <div className="table font_white_shadow">
      <ReactTable
        className="-striped -highlight"
        previousText="Назад"
        nextText="Вперед"
        loadingText="Загрузка"
        noDataText="Нет данных"
        pageText="Страница"
        ofText="из"
        rowsText="профилей"
        column={columnDefaults}
        data={(JSON.parse(props.personData)).filter(obj => { return obj.contract === props.tableType })}
        filterable
        defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value}
        columns={[
          {
            Header: 'Фото',
            width: widthForTable(25),
            Cell: (value) => (
              <img onClick={() => renderPersonFunc(value.original.code)} id="tablePhoto" alt="tablePhoto" height={80} src={getPhotoFunc(value.original.photoId)} />)
          },
          {
            Header: 'Имя',
            id: 'rowCode',
            width: widthForTable(50),
            style: { whiteSpace: 'unset' },
            getFooterProps: () => ({ style: { background: 'blue' } }),
            filterMethod: (filter, row) => {
              const name = row._original.personName;
              const code = row._original.code;
              if (name.toLowerCase().startsWith(filter.value.toLowerCase())) return true; // sort by second name
              if (code.toLowerCase().startsWith(filter.value.toLowerCase())) return true; // sort by second name
              if (name.includes(" ")) { // sort by first name
                if (name.toLowerCase().split(' ')[1].startsWith(filter.value.toLowerCase())) return true;
              }
            },
            Cell: (value) => (<button type="link" onClick={() => renderPersonFunc(value.original.code)}>{value.original.personName}</button>)
          },
          tableRow
        ]}
        defaultSorted={[{ id: 'personName', desc: false }]}
        defaultPageSize={20}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    personData: state.personStore.data
  }
}

export default connect(mapStateToProps)(TablePageShort);