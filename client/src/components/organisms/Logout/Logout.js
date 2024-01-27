import * as React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../context/app-context';
import { Button, H2 } from '../../atoms/';
import { resetBasketItems } from '../../../utils/batchItemHelpers';

export const Logout = () => {
  let history = useHistory();
  const [, , removeCookie] = useCookies();
  const { setUser, setToken, basket, setBasket, token, setBasketTimer } =
    React.useContext(AppContext);

  const handleLogoutClick = async () => {
    // Handle basket reset
    if (basket && basket.length) {
      await resetBasketItems(basket, token);
    }
    setBasket(null);
    setBasketTimer(null);

    // Trigger the navigation
    history.push(`/`);

    // Clear the auth settings
    removeCookie('jwt_user', { path: '/' });
    setToken(null);
    setUser(null);
  };

  return (
    <div>
      <H2>Thanks for stopping by!</H2>
      <Button small primary onClick={handleLogoutClick}>
        Logout
      </Button>
    </div>
  );
};
