/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { getDaysLeft, renderPersonFunc, getPhotoFunc } from '../App';


const TablePage = (props) => {
  return (
    <ReactTable
      className="table font_white_shadow -striped -highlight"
      previousText="Назад"
      nextText="Вперед"
      loadingText="Загрузка"
      noDataText="Нет данных"
      pageText="Страница"
      ofText="из"
      rowsText="профилей"
      data={(JSON.parse(props.personData)).filter(obj => { return obj.contract !== 'СОТРУДНИК' && obj.contract !== 'НЕТ' && obj.contract !== 'ЛИД' })}
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
        },{
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
        }
      ]}
      defaultSorted={[{ id: 'personName', desc: false }]}
      defaultPageSize={20}
    />
  )
}

const mapStateToProps = state => {
  return {
    personData: state.personStore.data
  }
}

export default connect(mapStateToProps)(TablePage);