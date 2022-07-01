import * as React from 'react';
import { AppContext } from '../../../context/app-context';
import { CategoryMenuWrapper, CategoryMenuLink, CategoryMenuItem, MainMenuNav, SubMenuItem, SubMenuNav, Cross } from './MobileMenu.styles';
import { categories, subCategories } from '../../../utils/constants';
import { tabList, hideMobileMenu } from '../../../utils/helpers';
import { Icon } from '../HeaderMenu/HeaderMenu.styles';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';

export const MobileMenu = () => {
  const { user } = React.useContext(AppContext);
  let history = useHistory();
  const { confirm } = Modal;

  var tabs = tabList(user);

  const basketCheck = () => {
    if (user && user.type === 'shopper') {
      history.push(`/basket`);
      hideMobileMenu();
    } else {
      confirm({
        title: `Please sign up as a shopper to shop!`
      });
    }
  }

  return (
    <>
    <CategoryMenuWrapper id='mobileMenu'>
      <MainMenuNav>
            <CategoryMenuItem key={'account icon'}>
              <CategoryMenuLink to="/dashboard" onClick={hideMobileMenu}><Icon src='/GYB-account.svg' alt='account icon' /> Account</CategoryMenuLink>
              {(tabs.length)? 
                <SubMenuNav>
                {tabs.map((d)=>{
                  return (
                    (d.name === 'Dashboard')? ''
                    : <li><SubMenuItem key={d.id} to={"/dashboard/" + d.id} onClick={hideMobileMenu}>{d.name}</SubMenuItem></li>
                  )
                })}
              </SubMenuNav>
              : ''            
            }
            </CategoryMenuItem>
            <CategoryMenuItem key={'basket icon'}>
              <CategoryMenuLink to="#" onClick={basketCheck}><Icon src='/GYB-basket.svg' alt='account icon' />Basket</CategoryMenuLink>
            </CategoryMenuItem>
        {categories.map((c) => {
          return (
            <CategoryMenuItem key={c.id}>
              <CategoryMenuLink to={"/products/" + c.id} key={'link-' + c.id} onClick={hideMobileMenu}>{c.name}</CategoryMenuLink>
              <SubMenuNav>
                {subCategories.map((d) => {
                  if (d.parentCategory === c.id && c.id !== 'other') {
                    return (<li><SubMenuItem key={d.id} to={"/products/" + c.id + "/" + d.id} onClick={hideMobileMenu}>{d.name}</SubMenuItem></li>);
                  } else {
                    return ''
                  }
                })}
              </SubMenuNav>
            </CategoryMenuItem>
          )
        })}
      </MainMenuNav>
    </CategoryMenuWrapper>
    <Cross id='cross' onClick={hideMobileMenu} />
    </>
  );
};
