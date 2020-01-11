/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { getDaysLeft, renderPersonFunc, getPhotoFunc } from '../App';


// render table first => fail.  Set loaderSpinner and state later

const MyTable = (props) => {
  return (
    <ReactTable
      className="table font_white_shadow -striped -highlight"
      data={(JSON.parse(props.personData)).filter(obj => { return obj.contract !== 'СОТРУДНИК' && obj.contract !== 'НЕТ' && obj.contract !== 'ЛИД'})}
      filterable
      defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value}
      columns={[
          {
            Header: () => <strong>Фото</strong>,
            accessor: 'photoId',
            headerClassName: 'headerTable',
            width: 95,
            Cell: ({ value }) => (
              <img id="tablePhoto" alt="tablePhoto" height={80} src={getPhotoFunc(value)} />)
          }, {
            Header: () => <strong>Имя</strong>,
            accessor: 'personName',
            headerClassName: 'headerTable',
            width: 250,
            filterMethod: (filter, row) => {
              if (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())) { // sort by second name
                return true;
              }
              if (row[filter.id].includes(" ")) { // sort by first name
                if (row[filter.id].toLowerCase().split(' ')[1].startsWith(filter.value.toLowerCase())) {
                  return true;
                }
              }
            },
            style: { whiteSpace: 'unset' } // allow for words wrap inside
          }, {
            Header: () => <strong>Контракт</strong>,
            accessor: 'contract',
            width: 210,
            headerClassName: 'headerTable',
            filterMethod: (filter, row) => {
              if (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())) { // sort by second name
                return true;
              }
              if (row[filter.id].includes(" ")) { // sort by first name
                if (row[filter.id].toLowerCase().split(' ')[1].startsWith(filter.value.toLowerCase())) {
                  return true;
                }
              }
            },
          }, {
            Header: () => (
              <strong>
Остаток
                <br />
Дней
              </strong>
),
            width: 90,
            headerClassName: 'headerTable',
            accessor: 'days',
            sortMethod: (a, b) => {
              const dayA = getDaysLeft(a);
              const dayB = getDaysLeft(b);
              return (dayA === null) - (dayB === null) || +(dayA > dayB) || -(dayA < dayB);
            },
            Cell: ({ value }) => (getDaysLeft(value))
          }, {
            Header: () => (
              <strong>
Трен
                <br />
ки
              </strong>
),
            style: { whiteSpace: 'unset' },
            width: 75,
            headerClassName: 'headerTable',
            accessor: 'remain'
          }, {
            Header: () => (
              <strong>
Аренда
                <br />
Дней
              </strong>
),
            width: 80,
            headerClassName: 'headerTable',
            accessor: 'rent',
            sortMethod: (a, b) => {
              const dayA = getDaysLeft(a);
              const dayB = getDaysLeft(b);
              return (dayA === null) - (dayB === null) || +(dayA > dayB) || -(dayA < dayB);
            },
            Cell: ({ value }) => (getDaysLeft(value))
          }, {
            Header: () => (
              <strong>
Депо
                <br />
зит
              </strong>
),
            width: 70,
            headerClassName: 'headerTable',
            accessor: 'deposite'
          }, {
            Header: () => <strong>Код</strong>,
            accessor: 'code',
            width: 120,
            headerClassName: 'headerTable',
            filterMethod: (filter, row) =>
              row[filter.id].startsWith(filter.value),
              style: { whiteSpace: 'unset' }}, {
            Header: () => (
              <strong>
Парк
                <br />
овка
              </strong>
),
            width: 75,
            headerClassName: 'headerTable',
            accessor: 'autoMonth'
          },
          {
            Header: () => '',
            id: 'rowCode',
            width: 55,
            headerClassName: 'headerTable',
            getFooterProps: () => ({ style: { background: 'blue' } }),
            Cell: (value) => (<button type="button" onClick={() => renderPersonFunc(value.original.code)}><img width={30} height={30} alt="editImg" src={require('../images/profileLogo.svg')} /></button>)
          }
        ]}
      defaultSorted={[{id: 'personName',desc: false}]}
      defaultPageSize={20}
    />
  )
}

const mapStateToProps = state => {
  return {
    personData: state.personStore.data
  }
}

export default connect(mapStateToProps)(MyTable);