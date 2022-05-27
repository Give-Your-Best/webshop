import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { categories, subCategories } from '../../utils/constants';
import { Container, ItemCard, CategoryBreadcrumbs } from '../../components';
import { getItems } from '../../services/items';
import { ItemsWrapper } from './Products.styles';

export const Products = () => {
  const { category, subCategory } = useParams();
  const [items, setItems] = useState([]);
  const mountedRef = useRef(true);
  
  let categoryName = '';
  categories.forEach((c) => {
    if (c.id === category) {
      categoryName = c.name;
    }
  })

  subCategories.forEach((c) => {
    if (c.id === subCategory) {
      categoryName = c.name;
    }
  })

  useEffect(() => {

    const fetchItems = async () => {
        const items = await getItems('approved', 'in-shop', category, subCategory);
        if (!mountedRef.current) return null;
        setItems(items);
    };

    fetchItems();
    return () => {
      mountedRef.current = false;
    };

  }, [category, subCategory]);

  return (
    <Container>
      <CategoryBreadcrumbs category={category} subCategory={subCategory} />
      <h1>{(categoryName)? categoryName: 'All Items'}</h1>
      <ItemsWrapper my={1} mx={-1} display="flex" flexWrap="wrap">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </ItemsWrapper>
    </Container>
  );
};
