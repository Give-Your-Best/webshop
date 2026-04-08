import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Home,
  Item,
  Login,
  Register,
  Dashboard,
  Products,
  Menswear,
  Children,
  Basket,
  DonorProducts,
  SizingGuide,
  Womenswear,
} from './pages';
import ProtectedRoute from './components/ProtectedRoute';

export const Routes = () => {
  return (
    <Switch>
      <Route path={`/item/:itemId`}>
        <Item />
      </Route>
      <Route exact path="/products">
        <Products />
      </Route>
      <Route path="/womenswear/:category/:subCategory">
        <Womenswear />
      </Route>
      <Route path="/womenswear/:category">
        <Womenswear />
      </Route>
      <Route path="/womenswear">
        <Womenswear />
      </Route>
      <Route path="/menswear/:category/:subCategory">
        <Menswear />
      </Route>
      <Route path="/menswear/:category">
        <Menswear />
      </Route>
      <Route path="/menswear">
        <Menswear />
      </Route>
      <Route path="/children/:category/:subCategory">
        <Children />
      </Route>
      <Route path="/children/:category">
        <Children />
      </Route>
      <Route path="/children">
        <Children />
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
      <Route path="/sizing-guide">
        <SizingGuide />
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
