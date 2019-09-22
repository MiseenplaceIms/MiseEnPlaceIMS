import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Login from '../Login';
import OrdersTable from '../OrdersTable';

function App() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path="/" component={Login} />
      <Route path="/orders" component={OrdersTable} />
    </Switch>
  );
}

export default App;
