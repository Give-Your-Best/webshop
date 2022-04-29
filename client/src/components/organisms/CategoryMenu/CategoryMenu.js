import * as React from 'react';
import { CategoryMenuWrapper, CategoryMenuItem } from './CategoryMenu.styles';
import { categories } from '../../../utils/constants';
import { BurgerMenu } from '../../atoms/BurgerMenu';

export const CategoryMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
    <CategoryMenuWrapper>
      {categories.slice(0, 6).map((c)=>{
          return (<CategoryMenuItem open={open} setOpen={setOpen} key={c.id} to={"/products/" + c.id} >{c.name}</CategoryMenuItem>);
      })}
    </CategoryMenuWrapper>
    <BurgerMenu open={open} setOpen={setOpen} />
    </>
  );
};
