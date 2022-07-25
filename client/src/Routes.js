import React, { useContext } from "react";
import { AppContext } from './context/app-context';
import { useCookies } from 'react-cookie';
import { Switch, Route } from 'react-router-dom';
import { Home, Item, Login, Register, Dashboard, Products, Basket, DonorProducts } from './pages';
import ProtectedRoute from "./components/ProtectedRoute"
import { authenticateUser } from "./services/user";

export const Routes = () => {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const [cookies] = useCookies();
  var isAuthenticated = token && user && cookies['jwt_user'];

  const authenticate = async (cookie) => {
      const res = await authenticateUser(cookie);
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        isAuthenticated = true;
      } else {
        isAuthenticated = false;
      }
  };
  
  if (!token && !user && cookies['jwt_user']) {
      // re-log them in with /authenticate
      authenticate(cookies['jwt_user']);
    }


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
      <ProtectedRoute path={`/dashboard/:itemId`} component={Dashboard} isAuthenticated={isAuthenticated}></ProtectedRoute>
      <ProtectedRoute path="/dashboard" component={Dashboard} isAuthenticated={isAuthenticated}></ProtectedRoute>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};
