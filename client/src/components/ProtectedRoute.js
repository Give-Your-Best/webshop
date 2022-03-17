import React, { useContext } from "react";
import { AppContext } from '../context/app-context';
import { useCookies } from 'react-cookie';
import { Redirect, Route } from "react-router-dom";
import { authenticateUser } from '../services/user';

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const { user, token, setUser, setToken } = useContext(AppContext);
    const [cookies] = useCookies();
    var isAuthenticated = token && user && cookies['jwt_user'];

    const authenticate = async (cookie) => {
        const res = await authenticateUser(cookie);
        if (res.success) {
            console.log('success')
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
        <Route
        {...restOfProps}
        render={(props) =>
            isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
        />
    );
}

export default ProtectedRoute;