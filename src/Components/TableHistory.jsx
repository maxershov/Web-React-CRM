import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table-6/react-table.min';
import { connect } from 'react-redux';
import { getDaysLeft } from '../App';



const TableHistory = (props) => {
  const parsedData = JSON.parse(props.activityData).filter(obj => obj.code === props.code);
  const [widthCoeff, setWidthCoeff] = useState(window.innerWidth / 100);

  function handleResize() {
    setWidthCoeff(window.innerWidth - 5 / 100);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        columns={[{
          Header: 'Тип',
          accessor: 'type',
          headerClassName: 'tableHeader',
          style: { whiteSpace: 'unset' },
          width: widthCoeff * 16,
        }, {
          Header: 'Дата',
          accessor: 'date',
          width: widthCoeff * 10,
          headerClassName: 'tableHeader',
          sortMethod: (a, b) => {
            const dayA = getDaysLeft(a);
            const dayB = getDaysLeft(b);
            return (dayA === "") - (dayB === "") || +(dayA > dayB) || -(dayA < dayB);
          }
        }, {
          Header: 'Время',
          width: widthCoeff * 10,
          accessor: 'time',
          headerClassName: 'tableHeader'
        }, {
          Header: 'Имя',
          accessor: 'person',
          style: { whiteSpace: 'unset' },
          width: widthCoeff * 20,
          headerClassName: 'tableHeader'
        }, {
          Header: 'Значение',
          accessor: 'amount',
          width: widthCoeff * 40,
          headerClassName: 'tableHeader',
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