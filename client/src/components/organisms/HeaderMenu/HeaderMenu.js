import * as React from 'react';
import { Modal } from 'antd';
import { AppContext } from '../../../context/app-context';
import { HeaderMenuWrapper, UserMenuItem, Icon } from './HeaderMenu.styles';
import { useHistory } from 'react-router-dom';

export const HeaderMenu = () => {
  const { user } = React.useContext(AppContext);
  let history = useHistory();
  const { confirm } = Modal;

  const basketCheck = () => {
    if (user && user.type === 'shopper') {
      history.push(`/basket`);
    } else {
      confirm({
        title: `Please sign up as a shopper to shop!`
      });
    }
  }

  return (
    <HeaderMenuWrapper>
      <UserMenuItem to="/dashboard">Account</UserMenuItem>
      <UserMenuItem to='/dashboard'><Icon src='/GYB-account.svg' alt='account icon' /></UserMenuItem>
      <UserMenuItem to="#" onClick={basketCheck}><Icon src='/GYB-basket.svg' alt='basket icon' /></UserMenuItem>
      <UserMenuItem to="#" onClick={basketCheck}>Basket</UserMenuItem>
    </HeaderMenuWrapper>
  );
};
