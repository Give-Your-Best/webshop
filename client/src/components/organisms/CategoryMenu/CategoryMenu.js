import * as React from 'react';
import { CategoryMenuWrapper, CategoryMenuLink, CategoryMenuItem, MainMenuNav, SubMenuItem, SubMenuNav } from './CategoryMenu.styles';
import { categories, subCategories } from '../../../utils/constants';

export const CategoryMenu = () => {

  return (
    <CategoryMenuWrapper>
      <MainMenuNav>
        {categories.map((c) => {
          return (
            <CategoryMenuItem key={c.id}>
              <CategoryMenuLink to={"/products/" + c.id} key={'link-' + c.id}>{c.name}</CategoryMenuLink>
              <SubMenuNav>
                {subCategories.map((d) => {
                  console.log(d)
                  d.id = d.id.replace('/', '-');
                  if (d.parentCategory === c.id && c.id !== 'other') {
                    return (<li key={d.id}><SubMenuItem key={d.id} to={"/products/" + c.id + "/" + d.id}>{d.name}</SubMenuItem></li>);
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
  );
};
