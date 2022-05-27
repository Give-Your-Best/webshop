import * as React from 'react';
import { CategoryMenuWrapper, CategoryMenuItem, SubCategoryMenuWrapper, SubMenuItem } from './CategoryMenu.styles';
import { categories, subCategories } from '../../../utils/constants';
import { BurgerMenu } from '../../atoms/BurgerMenu';

export const CategoryMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
    <CategoryMenuWrapper>
      {categories.slice(0, 6).map((c)=>{
          return (
            <div key={c.id}>
            <CategoryMenuItem 
              open={open} 
              setOpen={setOpen} 
              key={c.id}  
              to={"/products/" + c.id}
            >
              {c.name}   
              <SubCategoryMenuWrapper>
              {subCategories.map((d) => {
                if (d.parentCategory === c.id && c.id !== 'other') {
                  return (<SubMenuItem key={d.id} to={"/products/" + c.id + "/" + d.id}>{d.name}</SubMenuItem>);
                } else {
                  return ''
                }
              })}
            </SubCategoryMenuWrapper> 
            </CategoryMenuItem>
            </div>
          );
      })}
    </CategoryMenuWrapper>
    <BurgerMenu open={open} setOpen={setOpen} />
    </>
  );
};
