import React, { useState, useEffect } from 'react';
import {
  Container,
  ItemCard,
  CategoryBreadcrumbs,
  Button,
} from '../../components';
import { Filters } from '../../components/molecules';
import { getItems } from '../../services/items';
import { ItemsWrapper, PageWrapper, Heading } from './Products.styles';

export const Products = () => {
  const [items, setItems] = useState([]);
  const [noItems, setNoItems] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreLoad, setNoMoreLoad] = useState(false);
  const [clothingSizes, setClothingSizes] = useState([]);
  const [shoeSizes, setShoeSizes] = useState([]);
  const [colours, setColours] = useState([]);
  const [filters, setFilters] = useState(false);

  const handleLoadMore = async () => {
    const more = await getItems(
      page + 1,
      12,
      'approved',
      'in-shop',
      undefined,
      undefined,
      '',
      clothingSizes,
      shoeSizes,
      colours
    );
    if (more.length > 0) {
      setItems(items.concat(more));
      setPage(page + 1);
    } else {
      setNoMoreLoad(true);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems(
        page,
        12,
        'approved',
        'in-shop',
        undefined,
        undefined,
        '',
        clothingSizes,
        shoeSizes,
        colours
      );
      setItems(items);
      setNoItems(items.length > 0 ? false : true);
      setNoMoreLoad(false);
    };
    fetchItems();
    // eslint-disable-next-line
  }, [filters]);

  return (
    <Container>
      <CategoryBreadcrumbs />
      <Heading>{'All Items'}</Heading>
      <Filters
        setClothingSizes={setClothingSizes}
        setShoeSizes={setShoeSizes}
        setColours={setColours}
        colours={colours}
        clothingSizes={clothingSizes}
        shoeSizes={shoeSizes}
        setFilters={setFilters}
      />
      {items.length > 0 ? (
        <PageWrapper>
          <ItemsWrapper my={1} mx={-1} display="flex" flexWrap="wrap">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </ItemsWrapper>
          {!noMoreLoad ? (
            <Button center primary onClick={handleLoadMore}>
              {'Load More >'}
            </Button>
          ) : (
            ''
          )}
        </PageWrapper>
      ) : noItems ? (
        <>
          <h2>Sorry for the inconvenience</h2>
          <h3>There are no items here!</h3>
        </>
      ) : (
        ''
      )}
    </Container>
  );
};
