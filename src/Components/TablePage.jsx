/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'preact/compat';
import ReactTable from 'react-table-6/react-table.min';
import { Link, useHistory, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { getDaysLeft } from '../App';
import phoneSvg from "../assets/phone.svg"




const TablePage = (props) => {
  const history = useHistory();
  const { pageNum } = useParams();
  const [widthCoeff, setWidthCoeff] = useState(window.innerWidth / 100);

  function handleResize() {
    setWidthCoeff(window.innerWidth / 100);
  }

  useEffect(() => {
    document.title = "Клиенты CRM";
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <><img className="warning-to-landscape" alt="turn to landscape" src={phoneSvg} />
      <ReactTable
        className="table -striped -highlight portrait-hide"
        page={parseInt(pageNum, 10) - 1}
        onPageChange={(pageIndex) => { history.push(`/clients/page/${pageIndex + 1}`) }}
        previousText="Назад"
        nextText="Вперед"
        loadingText="Загрузка"
        noDataText="Нет данных"
        pageText="Страница"
        ofText="из"
        rowsText="профилей"
        headerClassName="table__header"
        data={(JSON.parse(props.personData)).filter(obj => obj.contract !== 'СОТРУДНИК' && obj.contract !== 'НЕТ' && obj.contract !== 'ЛИД')}
        filterable
        defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value}
        columns={[
          {
            Header: 'Фото',
            width: widthCoeff * 15,
            headerClassName: 'table__header',
            Cell: (value) => (
              <input
                className="person-img" 
                type="image"
                alt="Profile image"
                onClick={() => history.push(`/profile/${value.original.code}`)}
                src={require(`../images/${value.original.photoId}.jpg`)}
              />
            )
          },
          {
            Header: 'Имя',
            id: 'rowCode',
            width: widthCoeff * 20,
            style: { whiteSpace: 'unset' },
            headerClassName: 'table__header',
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
          }
          , {
            Header: 'Контракт',
            accessor: 'contract',
            style: { whiteSpace: 'unset' },
            headerClassName: 'table__header',
            width: widthCoeff * 17.5,
            filterMethod: (filter, row) => {
              if (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())) return true;// sort by second word
              if (row[filter.id].includes(" ")) { // sort by first word
                if (row[filter.id].toLowerCase().split(' ')[1].startsWith(filter.value.toLowerCase())) return true;
              } return false;
            },
          }, {
            Header: 'Остаток дней',
            width: widthCoeff * 9,
            accessor: 'days',
            headerClassName: 'table__header',
            sortMethod: (a, b) => {
              const dayA = getDaysLeft(a);
              const dayB = getDaysLeft(b);
              return (dayA === "") - (dayB === "") || +(dayA > dayB) || -(dayA < dayB);
            },
            Cell: ({ value }) => (getDaysLeft(value))
          }, {
            Header: 'Посещений',
            width: widthCoeff * 9,
            accessor: 'remain',
            headerClassName: 'table__header',
          }, {
            Header: 'Аренда дней',
            width: widthCoeff * 9,
            accessor: 'rent',
            headerClassName: 'table__header',
            sortMethod: (a, b) => {
              const dayA = getDaysLeft(a);
              const dayB = getDaysLeft(b);
              return (dayA === "") - (dayB === "") || +(dayA > dayB) || -(dayA < dayB);
            },
            Cell: ({ value }) => (getDaysLeft(value)),
          }, {
            Header: 'Депозит',
            width: widthCoeff * 11.5,
            accessor: 'deposite',
            headerClassName: 'table__header'
          }, {
            Header: 'Парковка',
            width: widthCoeff * 9,
            accessor: 'autoMonth',
            headerClassName: 'table__header'
          }
        ]}
        defaultSorted={[{ id: 'personName', desc: false }]}
        defaultPageSize={20}
      />
    </>
  )
}


const mapStateToProps = state => {
  return {
    personData: state.personStore.data
  }
}

export default connect(mapStateToProps)(TablePage);