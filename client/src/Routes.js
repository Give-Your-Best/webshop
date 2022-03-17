import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Item, Login, User, Register, Dashboard } from './pages';
import ProtectedRoute from "./components/ProtectedRoute"

export const Routes = () => {

  return (
    <Switch>
      <Route path={`/item/:itemId`}>
        <Item />
      </Route>
      <ProtectedRoute path="/user/:userId" component={User}></ProtectedRoute>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <ProtectedRoute path="/dashboard" component={Dashboard}></ProtectedRoute>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};
