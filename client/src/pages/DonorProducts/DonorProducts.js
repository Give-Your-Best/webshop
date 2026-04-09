import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryBreadcrumbs } from '../../components/atoms';
import { Container, ItemCard, Button } from '../../components';
import { getItems } from '../../services/items';
import { ItemsWrapper, PageWrapper } from './DonorProducts.styles';

export const DonorProducts = () => {
  const { donorId } = useParams();
  const [items, setItems] = useState([]);
  const [noMoreLoad, setNoMoreLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [noItems, setNoItems] = useState(false);

  const handleLoadMore = async () => {
    const more = await getItems(
      page + 1,
      8,
      'approved',
      'in-shop',
      '',
      '',
      donorId
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
        8,
        'approved',
        'in-shop',
        '',
        '',
        donorId
      );
      setItems(items);
      setNoItems(items.length > 0 ? false : true);
      setNoMoreLoad(false);
    };

    fetchItems();
    // eslint-disable-next-line
  }, [donorId]);

  return (
    <Container>
      <CategoryBreadcrumbs crumbs={[{ label: 'Donor Products' }]} />
      {items.length > 0 ? (
        <PageWrapper>
          <ItemsWrapper my={1} mx={-1} display="flex" flexWrap="wrap">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </ItemsWrapper>
          {!noMoreLoad ? (
            <Button center primary onClick={handleLoadMore}>
              Load More
            </Button>
          ) : (
            ''
          )}
        </PageWrapper>
      ) : noItems ? (
        <>
          <h2>Looks like there are no items uploaded here at the moment</h2>
          <h3>Check back soon as new items are uploaded regularly!</h3>
        </>
      ) : (
        ''
      )}
    </Container>
  );
};
