import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/app-context';
import { useCookies } from 'react-cookie';
import { Redirect, Route } from 'react-router-dom';
import { authenticateUser } from '../services/user';
import { LoadingSpinner } from '../components/atoms';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const [cookies] = useCookies();
  const [isAuth, setIsAuth] = useState(
    token && user && user.type === 'admin' && cookies['jwt_user']
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //fuinction to authenticate cookie
    const authenticate = async (cookie) => {
      const res = await authenticateUser(cookie);
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        setIsAuth(true);
        setIsLoading(false);
      } else {
        setIsAuth(false);
        setIsLoading(false);
      }
    };

    if (!token && (!user || user.type !== 'admin') && cookies['jwt_user']) {
      // re-log them in with /authenticate
      authenticate(cookies['jwt_user']);
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []); //empty array required for the auth load to work

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Route
          {...restOfProps}
          render={(props) =>
            isAuth ? <Component {...props} /> : <Redirect to="/login" />
          }
        />
      )}
    </>
  );
}

export default ProtectedRoute;
