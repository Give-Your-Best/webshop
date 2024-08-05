import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import {
  Home,
  // Item,
  Login,
  // Register,
  Dashboard,
  // Products,
  // Basket,
  // DonorProducts,
  // SizingGuide,
} from './pages';
import ProtectedRoute from './components/ProtectedRoute';

export const Routes = () => {
  return (
    <Switch>
      <Route path={`/item/:itemId`}>
        <Redirect to="/" />
        {/* <Item /> */}
      </Route>
      <Route path={`/products/:category/:subCategory`}>
        <Redirect to="/" />
        {/* <Products /> */}
      </Route>
      <Route path={`/products/:category`}>
        <Redirect to="/" />
        {/* <Products /> */}
      </Route>
      <Route path={`/products/`}>
        <Redirect to="/" />
        {/* <Products /> */}
      </Route>
      <Route path={`/donorproducts/:donorId`}>
        <Redirect to="/" />
        {/* <DonorProducts /> */}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/basket">
        <Redirect to="/" />
        {/* <Basket /> */}
      </Route>
      <Route path="/register">
        <Redirect to="/" />
        {/* <Register /> */}
      </Route>
      <Route path="/sizing-guide">
        <Redirect to="/" />
        {/* <SizingGuide /> */}
      </Route>
      <ProtectedRoute
        path={`/dashboard/:itemId`}
        component={Dashboard}
      ></ProtectedRoute>
      <ProtectedRoute path="/dashboard" component={Dashboard}></ProtectedRoute>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};
