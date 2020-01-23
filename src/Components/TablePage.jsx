/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactTable from 'react-table-6/react-table.min';
import { Link, useHistory, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { getDaysLeft, getPhotoFunc} from '../App';


// set width to table colums by .className size
function widthForTable(value) {
  return Math.round(window.innerWidth * (value / 100))
}

const TablePage = (props) => {

  const history = useHistory();
  const {pageNum } = useParams();
  return (
    <ReactTable
      className="table font_white_shadow -striped -highlight"
      page={parseInt(pageNum,10)-1}
      onPageChange={(pageIndex) => {history.push(`/clients/page/${  pageIndex+1}`)}} 
      previousText="Назад"
      nextText="Вперед"
      loadingText="Загрузка"
      noDataText="Нет данных"
      pageText="Страница"
      ofText="из"
      rowsText="профилей"
      headerClassName="tableHeader"
      data={(JSON.parse(props.personData)).filter(obj => { return obj.contract !== 'СОТРУДНИК' && obj.contract !== 'НЕТ' && obj.contract !== 'ЛИД' })}
      filterable
      defaultFilterMethod={(filter, row) =>
        String(row[filter.id]) === filter.value}
      columns={[
        {
          Header: 'Фото',
          width: widthForTable(10),
          headerClassName: 'tableHeader',
          Cell: (value) => (
            <button type="button" onClick={() => history.push(`/profile/${  value.original.code}`)}><img id="tablePhoto" alt="tablePhoto" height={80} src={getPhotoFunc(value.original.photoId)} /></button>)
        },
        {
          Header: 'Имя',
          id: 'rowCode',
          width: widthForTable(25),
          style: { whiteSpace: 'unset' },
          headerClassName: 'tableHeader',
          filterMethod: (filter, row) => {
            const name = row._original.personName;
            const {code} = row._original;
            if (name.toLowerCase().startsWith(filter.value.toLowerCase())) return true; // sort by second name
            if (code.toLowerCase().startsWith(filter.value.toLowerCase())) return true; // sort by second name
            if (name.includes(" ")) { // sort by first name
              if (name.toLowerCase().split(' ')[1].startsWith(filter.value.toLowerCase())) return true;
            } return false;
          },
          Cell: (value) => (<Link to={`/profile/${value.original.code}`}>{value.original.personName}</Link>)
        }
        ,{
          Header: 'Контракт',
          accessor: 'contract',
          style: { whiteSpace: 'unset' },
          headerClassName: 'tableHeader',
          width: widthForTable(17,5),
          filterMethod: (filter, row) => {
            if (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())) return true;// sort by second name
            if (row[filter.id].includes(" ")) { // sort by first name
              if (row[filter.id].toLowerCase().split(' ')[1].startsWith(filter.value.toLowerCase())) return true;
            } return false;
          },
        }, {
          Header: 'Остаток Дней',
          width: widthForTable(9),
          accessor: 'days',
          headerClassName: 'tableHeader',
          sortMethod: (a, b) => {
            const dayA = getDaysLeft(a);
            const dayB = getDaysLeft(b);
            return (dayA === "") - (dayB === "") || +(dayA > dayB) || -(dayA < dayB);
          },
          Cell: ({ value }) => (getDaysLeft(value))
        }, {
          Header: 'Тренировки',
          width: widthForTable(9),
          accessor: 'remain',
          headerClassName: 'tableHeader',
        }, {
          Header: 'Аренда Дней',
          width: widthForTable(9),
          accessor: 'rent',
          headerClassName: 'tableHeader',
          sortMethod: (a, b) => {
            const dayA = getDaysLeft(a);
            const dayB = getDaysLeft(b);
            return (dayA === "") - (dayB === "") || +(dayA > dayB) || -(dayA < dayB);
          },
          Cell: ({ value }) => (getDaysLeft(value)),
        }, {
          Header: 'Депозит',
          width: widthForTable(11,5),
          accessor: 'deposite',
          headerClassName: 'tableHeader'
        }, {
          Header: 'Парковка',
          width: widthForTable(9),
          accessor: 'autoMonth',
          headerClassName: 'tableHeader'
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