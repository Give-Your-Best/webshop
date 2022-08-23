import * as React from 'react';
import { AppContext } from '../../../context/app-context';
import { CategoryMenuWrapper, CategoryMenuLink, CategoryMenuItem, MainMenuNav, SubMenuItem, SubMenuNav, Cross, Down } from './MobileMenu.styles';
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
        className: "modalStyle",
        title: `Please sign up as a shopper to shop!`
      });
    }
  }

  const openSubNav = (e) => {
    e.stopPropagation();
    e.target.parentNode.parentNode.classList.toggle('open');
    e.target.parentNode.classList.toggle('open');
  }

  const toggleAccountMenu = (e) => {
    if (!tabs.length) {
      history.push(`/dashboard`);
      hideMobileMenu();
    } else {
      openSubNav(e)
    }
  }

  return (
    <>
    <CategoryMenuWrapper id='mobileMenu'>
      <MainMenuNav>
            <CategoryMenuItem key={'account icon'}>
              <CategoryMenuLink onClick={toggleAccountMenu}><Icon onClick={toggleAccountMenu} src='/GYB-account.svg' alt='account icon' /> Account{(tabs.length)? <Down onClick={openSubNav}></Down>: ''}</CategoryMenuLink>
              {(tabs.length)? 
                <SubMenuNav>
                {tabs.map((d)=>{
                  return (
                    (d.name === 'Dashboard')? ''
                    : <li key={d.id}><SubMenuItem key={d.id} onClick={() => { history.push('/dashboard/' + d.id); hideMobileMenu()} }>{d.name}</SubMenuItem></li>
                  )
                })}
              </SubMenuNav>
              : ''            
            }
            </CategoryMenuItem>
            <CategoryMenuItem key={'basket icon'}>
              <CategoryMenuLink onClick={basketCheck}><Icon src='/GYB-basket.svg' alt='account icon' />Basket</CategoryMenuLink>
            </CategoryMenuItem>
        {categories.map((c) => {
          return (
            <CategoryMenuItem key={c.id}>
              <CategoryMenuLink key={'link-' + c.id} onClick={() => { history.push('/products/' + c.id); hideMobileMenu()} }>{c.name} <Down onClick={openSubNav}></Down></CategoryMenuLink>
              <SubMenuNav>
                {subCategories.map((d) => {
                  d.id = d.id.replace('/', '-');
                  if (d.parentCategory === c.id && c.id !== 'other') {
                    return (<li key={d.id}><SubMenuItem key={d.id} onClick={() => { history.push("/products/" + c.id + "/" + d.id); hideMobileMenu()} }>{d.name}</SubMenuItem></li>);
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
