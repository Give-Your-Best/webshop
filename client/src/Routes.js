import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Item, Login, Register, Dashboard, Products, Basket, DonorProducts } from './pages';
import ProtectedRoute from "./components/ProtectedRoute"

export const Routes = () => {

  return (
    <Switch>
      <Route path={`/item/:itemId`}>
        <Item />
      </Route>
      <Route path={`/products/:category/:subCategory`}>
        <Products />
      </Route>
      <Route path={`/products/:category`}>
        <Products />
      </Route>
      <Route path={`/products/`}>
        <Products />
      </Route>
      <Route path={`/donorproducts/:donorId`}>
        <DonorProducts />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/basket">
        <Basket />
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
