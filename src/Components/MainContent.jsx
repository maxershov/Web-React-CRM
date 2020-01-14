import React from 'react';
import { connect } from 'react-redux';
import { getPhotoFunc } from '../App';
import UserPage from './UserPage';
import TablePage from './TablePage';
import TablePageShort from './TablePageShort';
import MainPage from './MainPage';

const MainContent = (props) => {
  switch (props.renderPage) {
    case 'TABLE_PAGE':
      return (<TablePage />);
    case 'MAIN_PAGE':
      return (<MainPage func={props.setRenderPage} getPhoto={getPhotoFunc} renderPerson={props.renderPerson} />);
    case 'PROFILE_PAGE':
      return (<UserPage deletePerson={props.deletePerson} />);
    case 'EMPLOYEE_PAGE':
      return (<TablePageShort tableType="СОТРУДНИК" />);
    case 'LOST_TABLE_PAGE':
      return (<TablePageShort tableType="НЕТ" />);
    case 'LEAD_TABLE_PAGE':
      return (<TablePageShort tableType="ЛИД" />);
    default: return (<MainPage func={props.setRenderPage} />);
  }
}

const mapStateToProps = state => {
  return {
    renderPage: state.renderStore.page
  }
}

export default connect(mapStateToProps)(MainContent);