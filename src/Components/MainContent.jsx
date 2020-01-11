import React from 'react';
import { connect } from 'react-redux';
import { getPhotoFunc } from '../App';
import UserParams from './UserParams';
import MyTable from './MyTable';
import ShortTable from './ShortTable';
import MainPage from './MainPage';

const MainContent = (props) => {
  switch (props.renderPage) {
    case 'TABLE_PAGE':
      return (<MyTable />);
    case 'MAIN_PAGE':
      return (<MainPage func={props.setRenderPage} getPhoto={getPhotoFunc} renderPerson={props.renderPerson} />);
    case 'PROFILE_PAGE':
      return (<UserParams deletePerson={props.deletePerson} />);
    case 'EMPLOYEE_PAGE':
      return (<ShortTable tableType="СОТРУДНИК" />);
    case 'LOST_TABLE_PAGE':
      return (<ShortTable tableType="НЕТ" />);
    case 'LEAD_TABLE_PAGE':
      return (<ShortTable tableType="ЛИД" />);
    default: return (<MainPage func={props.setRenderPage} />);
  }
}

const mapStateToProps = state => {
  return {
    renderPage: state.renderStore.page
  }
}

export default connect(mapStateToProps)(MainContent);