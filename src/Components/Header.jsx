/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

const Header = (props) => {
  const { renderMain, renderTable, renderLostTable, renderProfile, renderEmployeeTable, renderTestPage, renderLeadTable} = props;
  return (
    <nav className="menu-container">
      <button type="button" onClick={renderMain}>Главная</button>
      <button type="button" onClick={renderTable}>Клиенты</button>
      <button type="button" onClick={renderLostTable}>Прошлые</button>
      <button type="button" onClick={renderLeadTable}>Лид</button>
      <button type="button" onClick={renderEmployeeTable}>Сотрудники</button>
      <button type="button" onClick={renderProfile}>Профиль</button>
      <button type="button" onClick={renderTestPage}>0.4.2 02.02</button>
    </nav>
  );
}

const mapStateToProps = state => {
  return {
    page: state.renderStore.page
  };
}

const mapDispatchToProps = dispatch => {
  return {
    renderMain: () => dispatch({ type: 'CHANGE_PAGE', page: 'MAIN_PAGE' }),
    renderTable: () => dispatch({ type: 'CHANGE_PAGE', page: 'TABLE_PAGE' }),
    renderLostTable: () => dispatch({ type: 'CHANGE_PAGE', page: 'LOST_TABLE_PAGE' }),
    renderProfile: () => dispatch({ type: 'CHANGE_PAGE', page: 'PROFILE_PAGE' }),
    renderEmployeeTable: () => dispatch({ type: 'CHANGE_PAGE', page: 'EMPLOYEE_PAGE' }),
    renderTestPage: () => dispatch({ type: 'CHANGE_PAGE', page: 'TEST_PAGE' }),
    renderLeadTable: () => dispatch({ type: 'CHANGE_PAGE', page: 'LEAD_TABLE_PAGE' }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);