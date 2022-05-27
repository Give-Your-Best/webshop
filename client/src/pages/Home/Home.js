import React, { useState, useEffect, useRef } from "react";
import { Button, ItemCard } from '../../components';
import { CategoriesCarousel} from '../../components/organisms';
import { getItems } from '../../services/items';
import { CoverWrapper, ItemsWrapper, CategoriesWrapper, H2, ButtonWrapper } from './Home.styles';
import logo from './website_cover.png';
import { subCategories } from '../../utils/constants';
import { useHistory } from 'react-router-dom';

export const Home = () => {
  const [items, setItems] = useState([]);
  let history = useHistory();
  const mountedRef = useRef(true);

  useEffect(() => {
    const fetchItems = async () => {
      console.log('fetching')
      const items = await getItems('approved', 'in-shop');
      if (!mountedRef.current) return null;
      setItems(items);
    };
    fetchItems();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div data-testid="HomeRoute">
        <CoverWrapper to="/">
          <h1>Give Your Best Shop</h1>
          <h3>Browse items from 100s of besties</h3>
          <h3>shopping up to 5 items per week for free!</h3>
          <img alt="give-your-best-cover" src={logo} />
        </CoverWrapper>
        <CategoriesWrapper>
          <h2>Browse Women's Categories</h2>
          <CategoriesCarousel categories={subCategories.filter((c) => {return c.parentCategory ==='women' && c.image})} />
        </CategoriesWrapper>
          <H2>Products</H2>
        <ItemsWrapper my={1} mx={-1} display="flex" flexWrap="wrap">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </ItemsWrapper>
      <ButtonWrapper>
        <Button center primary onClick={() => history.push(`/products/`)}>Browse All</Button>
      </ButtonWrapper>
    </div>
  );
};