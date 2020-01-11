import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { getPhotoFunc, renderPersonFunc, getDaysLeft } from '../App';


const ShortTable = (props) => {


  const leadObj = { 
    Header: () => <strong>Дата обращения</strong>,
    accessor: 'rent',
    width: 300,
    headerClassName: 'headerTable',
    sortMethod: (a, b) => {
      a = getDaysLeft(a);
      b = getDaysLeft(b);
      return (a === null) - (b === null) || +(a > b) || -(a < b);
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
      a = getDaysLeft(a);
      b = getDaysLeft(b);
      return (a === null) - (b === null) || +(a > b) || -(a < b);
    }
  }

  let tableRow = {};
  if (props.tableType === 'ЛИД') tableRow = leadObj;
  if (props.tableType === 'СОТРУДНИК') tableRow = employeeObj;
  if (props.tableType === 'НЕТ') tableRow= lostObj;


  return (
    <div className="table font_white_shadow">
      <ReactTable
        className="-striped -highlight"
        data={(JSON.parse(props.personData)).filter(obj => { return obj.contract === props.tableType })}
        filterable
        defaultFilterMethod={(filter, row) =>
        String(row[filter.id]) === filter.value}
        columns={[
        {
          Header: () => <strong>Фото</strong>,
          accessor: 'photoId',
          headerClassName: 'headerTable',
          width: 150,
          Cell: ({ value }) => (
            <img id="tablePhoto" alt="tablePhoto" height={60} src={getPhotoFunc(value)} />)
        }, {
          Header: () => <strong>Имя</strong>,
          accessor: 'personName',
          headerClassName: 'headerTable',
          width: 350,
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
        }, 
        tableRow, 
        {
          Header: () => '',
          id: 'rowCode',
          width: 55,
          headerClassName: 'headerTable',
          getFooterProps: () => ({ style: { background: 'blue' } }),
          Cell: (value) => (<button onClick={() => renderPersonFunc(value.original.code)}><img width={30} height={30} alt="editImg" src={require('../images/profileLogo.svg')} /></button>)
        }
      ]}
        defaultSorted={[{id: 'personName',desc: false}]}
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

export default connect(mapStateToProps)(ShortTable);