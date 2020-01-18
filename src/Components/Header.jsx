/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="menu-container">
      <NavLink activeClassName="is-active" to="/main">Главная</NavLink>
      <NavLink activeClassName="is-active" to="/clients/page/1">Клиенты</NavLink>
      <NavLink activeClassName="is-active" to="/lead/page/1">Лид</NavLink>      
      <NavLink activeClassName="is-active" to="/lost/page/1">Напомнить</NavLink>
      <NavLink activeClassName="is-active" to="/employee/page/1">Сотрудники</NavLink>
    </nav>
  );
}


export default Header;