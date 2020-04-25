/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-6/react-table.min';
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from "react-router-dom";
import { getDaysLeft } from '../App';
import phoneSvg from "../assets/phone.svg"



const TablePageShort = (props) => {
  const { pageNum } = useParams();
  const history = useHistory();
  const [widthCoeff, setWidthCoeff] = useState(window.innerWidth / 100);
  // TODO CRAP => can't change page in path => get path from history and del number 
  const path = history.location.pathname.replace(/[0-9]/g, '');


  function handleResize() {
    setWidthCoeff(window.innerWidth / 100);
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // some obj's for table => don't repeat photo and name column 
  const leadObj = {
    Header: 'Дата первого контакта',
    accessor: 'rent',
    width: widthCoeff * 25,
    headerClassName: 'tableHeader',
    sortMethod: (a, b) => {
      const dayA = getDaysLeft(a);
      const dayB = getDaysLeft(b);
      return (dayA === "") - (dayB === "") || +(dayA > dayB) || -(dayA < dayB);
    }
  }
  const employeeObj = {
    Header: 'Депозит',
    width: widthCoeff * 25,
    accessor: 'deposite',
    headerClassName: 'tableHeader'
  }
  const lostObj = {
    Header: 'Срок действия последнего абонемента',
    accessor: 'days',
    width: widthCoeff * 25,
    headerClassName: 'tableHeader',
    sortMethod: (a, b) => {
      const dayA = getDaysLeft(a);
      const dayB = getDaysLeft(b);
      return (dayA === "") - (dayB === "") || +(dayA > dayB) || -(dayA < dayB);
    }
  }

  let tableRow = {};
  if (props.tableType === 'ЛИД') {
    document.title = "Лид CRM"; 
    tableRow = leadObj;
  }
  if (props.tableType === 'СОТРУДНИК') {
    document.title = "Сотрудники CRM"; 
    tableRow = employeeObj;
  }
  if (props.tableType === 'НЕТ') {
    document.title = "Прошлые CRM"; 
    tableRow = lostObj;
  }

  return (
    <>
      <img className="askPhoneTurn" alt="turn to landscape" src={phoneSvg} />
      <div className="table portrait-hide">
        <ReactTable
          className="-striped -highlight"
          page={parseInt(pageNum, 10) - 1}
          onPageChange={(pageIndex) => { history.push(path + (pageIndex + 1)) }}
          previousText="Назад"
          nextText="Вперед"
          loadingText="Загрузка"
          noDataText="Нет данных"
          pageText="Страница"
          ofText="из"
          rowsText="профилей"
          data={(JSON.parse(props.personData)).filter(obj => obj.contract === props.tableType )}
          filterable
          defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value}
          columns={[
          {
            Header: 'Фото',
            width: widthCoeff * 15,
            headerClassName: 'tableHeader',
            Cell: (value) => (
              <input
                type="image"
                id="tablePhoto"
                onClick={() => history.push(`/profile/${value.original.code}`)}
                alt="Profile image"
                src={require(`../images/${value.original.photoId}.jpg`)}
              />
)
          },
          {
            Header: 'Имя',
            id: 'rowCode',
            width: widthCoeff * 50,
            style: { whiteSpace: 'unset' },
            headerClassName: 'tableHeader',
            accessor: 'personName',
            filterMethod: (filter, row) => {
              const name = row._original.personName;
              const { code } = row._original;
              if (name.toLowerCase().startsWith(filter.value.toLowerCase())) return true; // sort by second name
              if (code.toLowerCase().startsWith(filter.value.toLowerCase())) return true; // sort by code
              if (name.includes(" ")) { // sort by first name
                if (name.toLowerCase().split(' ')[1].startsWith(filter.value.toLowerCase())) return true;
              } return false;
            },
            Cell: row => (<Link to={`/profile/${row.original.code}`}>{row.original.personName}</Link>)
          },
          tableRow
        ]}
          defaultSorted={[{ id: 'personName', desc: false }]}
          defaultPageSize={20}
        />
      </div>
    </>
  )
}


const mapStateToProps = state => {
  return {
    personData: state.personStore.data
  }
}


export default connect(mapStateToProps)(TablePageShort);