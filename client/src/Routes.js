import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppContext } from './context/app-context';
import { Home, Item, Login } from './pages';
import { authenticateUser } from './services/user';

export const Routes = () => {
  const { user, token, setUser, setToken } = React.useContext(AppContext);
  const [cookies] = useCookies();

  const authenticate = async (cookie) => {
    const res = await authenticateUser(cookie);

    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      //   setCookie('jwt_user', res.token); // is this needed? only if this cookie times out
    } else {
      // we dont really want to do sth (this is not a protected route)
      //   user is just going to be logged out
    }
  };

  React.useEffect(() => {
    if (!token && !user && cookies['jwt_user']) {
      // re-log them in with /authenticate
      authenticate(cookies['jwt_user']);
    }
    if (!token && !user && !cookies['jwt_user']) {
      // TODO move to ProtectedRoute
      // and redirect to /login
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies, user, token]);

  return (
    <Switch>
      <Route path={`/item/:itemId`}>
        <Item />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};
