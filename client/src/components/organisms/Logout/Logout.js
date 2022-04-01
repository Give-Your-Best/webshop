import * as React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../context/app-context';
import { Button } from '../../atoms/';

export const Logout = () => {
  let history = useHistory();
  const [, , removeCookie] = useCookies();
  const { setUser, setToken } = React.useContext(AppContext);

  const handleLogoutClick = () => {
    setUser(null);
    setToken(null);
    removeCookie('jwt_user', { path: '/' });
    history.push(`/`)
  };
  return (
    <div>
      <h2>Thanks for stopping by</h2>
      <Button onClick={handleLogoutClick}>Logout</Button>
    </div>
  );
};
