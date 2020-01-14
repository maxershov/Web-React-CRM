/* eslint-disable react/prop-types */
import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { getPhotoFunc, renderPersonFunc, getDaysLeft } from '../App';

const TablePageShort = (props) => {

  const leadObj = {
    Header: () => <strong>Дата обращения</strong>,
    accessor: 'rent',
    width: 300,
    headerClassName: 'headerTable',
    sortMethod: (a, b) => {
      const dayA = getDaysLeft(a);
      const dayB = getDaysLeft(b);
      return (dayA === null) - (dayB === null) || +(dayA > dayB) || -(dayA < dayB);
    }
  }
  const employeeObj = {
    Header: () => <strong>Депозит</strong>,
    width: 150,
    headerClassName: 'headerTable',
    accessor: 'deposite'
  }
  const lostObj = {
    Header: () => (
      <strong>
        Срок действия
        {' '}
        <br />
        последнего абонемента
      </strong>
    ),
    accessor: 'days',
    width: 300,
    headerClassName: 'headerTable',
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
        previousText="Назад"
        nextText="Вперед"
        loadingText="Загрузка"
        noDataText="Нет данных"
        pageText="Страница"
        ofText="из"
        rowsText="профилей"
        className="-striped -highlight"
        data={(JSON.parse(props.personData)).filter(obj => { return obj.contract === props.tableType })}
        filterable
        defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value}
        columns={[
          {
            Header: () => <strong>Фото</strong>,
            headerClassName: 'headerTable',
            width: 95,
            Cell: (value) => (
              <img onClick={() => renderPersonFunc(value.original.code)} id="tablePhoto" alt="tablePhoto" height={80} src={getPhotoFunc(value.original.photoId)} />)
          },
          {
            Header: () => 'Имя',
            id: 'rowCode',
            width: 150,
            headerClassName: 'headerTable',
            getFooterProps: () => ({ style: { background: 'blue' } }),
            filterMethod: (filter, row) => {
              const name = row._original.personName;
              const code = row._original.code;
              if (name.toLowerCase().startsWith(filter.value.toLowerCase())) { // sort by second name
                return true;
              }
              if (code.toLowerCase().startsWith(filter.value.toLowerCase())) { // sort by second name
                return true;
              }
              if (name.includes(" ")) { // sort by first name
                if (name.toLowerCase().split(' ')[1].startsWith(filter.value.toLowerCase())) {
                  return true;
                }
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