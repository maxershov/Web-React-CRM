import React from 'preact/compat';
import { Route, Switch } from 'react-router-dom';
import UserPage from './UserPage';
import TablePage from './TablePage';
import TablePageShort from './TablePageShort';
import MainPage from './MainPage';

const MainContent = () => {
  return (
    <Switch>
      <Route exact path={["/crm/", "/"]} component={MainPage} />
      <Route exact path="/clients/page/:pageNum" component={TablePage} />
      <Route exact path="/lead/page/:pageNum" render={() => <TablePageShort tableType="ЛИД" />} />
      <Route exact path="/employee/page/:pageNum" render={() => <TablePageShort tableType="СОТРУДНИК" />} />
      <Route exact path="/lost/page/:pageNum" render={() => <TablePageShort tableType="НЕТ" />} />
      <Route exact path="/profile/:codeLink" component={UserPage} />
    </Switch>
  );
}

export default MainContent;