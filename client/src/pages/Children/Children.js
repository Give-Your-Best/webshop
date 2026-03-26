import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { subCategories } from '../../utils/constants';
import {
  Container,
  ItemCard,
  CategoryBreadcrumbs,
  Button,
} from '../../components';
import { Filters } from '../../components/molecules';
import { getItems } from '../../services/items';
import {
  ItemsWrapper,
  PageWrapper,
  Heading,
} from '../Products/Products.styles';

const resolveHeading = (subCategory) => {
  if (!subCategory) return 'Children & Baby';
  const sub = subCategories.find((s) => s.id === subCategory);
  return sub ? sub.name : '';
};

export const Children = () => {
  const { subCategory } = useParams();
  const heading = resolveHeading(subCategory);

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
      'children',
      subCategory,
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
      const result = await getItems(
        1,
        12,
        'approved',
        'in-shop',
        'children',
        subCategory,
        '',
        clothingSizes,
        shoeSizes,
        colours
      );
      setItems(result);
      setNoItems(result.length === 0);
      setNoMoreLoad(false);
      setPage(1);
    };

    fetchItems();
    // eslint-disable-next-line
  }, [subCategory, filters]);

  const breadcrumbProps = subCategory
    ? {
        root: { label: 'Kids', path: '/children' },
        categoryLabel: resolveHeading(subCategory),
        categoryPath: `/children/${subCategory}`,
      }
    : {
        root: { label: 'Kids', path: '/children' },
        categoryLabel: 'All',
        categoryPath: '/children',
      };

  return (
    <Container>
      <CategoryBreadcrumbs
        category="children"
        subCategory={subCategory}
        {...breadcrumbProps}
      />
      <Heading>{heading}</Heading>
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
