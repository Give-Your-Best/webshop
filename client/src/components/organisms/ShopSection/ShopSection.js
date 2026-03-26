import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { subCategories } from '../../../utils/constants';
import { Container, Button } from '../../atoms';
import { ItemCard } from '../../molecules';
import { Filters } from '../../molecules';
import { CategoryBreadcrumbs } from '../../atoms';
import { getItems } from '../../../services/items';
import {
  ItemsWrapper,
  PageWrapper,
  Heading,
} from '../../../pages/Products/Products.styles';

const resolveApiParams = (config, category, subCategory) => {
  if (!category)
    return {
      apiCategory: config.primaryApiCategory,
      apiSubCategory: undefined,
    };
  const isClothingSubCat = subCategories.some(
    (s) =>
      s.id === category && s.parentCategory === config.clothingParentCategory
  );
  if (isClothingSubCat)
    return { apiCategory: config.primaryApiCategory, apiSubCategory: category };
  return { apiCategory: category, apiSubCategory: subCategory };
};

const resolveHeading = (config, category, subCategory) => {
  if (!category) return config.defaultHeading;
  const clothingSubCat = subCategories.find(
    (s) =>
      s.id === category && s.parentCategory === config.clothingParentCategory
  );
  if (clothingSubCat) return clothingSubCat.name;
  if (subCategory) {
    const sub = subCategories.find((s) => s.id === subCategory);
    if (sub) return sub.name;
  }
  const topLevel = config.topLevelCategories.find((c) => c.id === category);
  return topLevel ? topLevel.name : '';
};

export const ShopSection = ({ config }) => {
  const { category, subCategory } = useParams();
  const { apiCategory, apiSubCategory } = resolveApiParams(
    config,
    category,
    subCategory
  );
  const heading = resolveHeading(config, category, subCategory);

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
      apiCategory,
      apiSubCategory,
      '',
      clothingSizes,
      shoeSizes,
      colours,
      config.gender || undefined
    );
    if (more.length > 0) {
      setItems((prev) => prev.concat(more));
      setPage((p) => p + 1);
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
        apiCategory,
        apiSubCategory,
        '',
        clothingSizes,
        shoeSizes,
        colours,
        config.gender || undefined
      );
      setItems(result);
      setNoItems(result.length === 0);
      setNoMoreLoad(false);
      setPage(1);
    };
    fetchItems();
    // eslint-disable-next-line
  }, [category, subCategory, filters]);

  return (
    <Container>
      <CategoryBreadcrumbs />
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
          {!noMoreLoad && (
            <Button center primary onClick={handleLoadMore}>
              {'Load More >'}
            </Button>
          )}
        </PageWrapper>
      ) : noItems ? (
        <>
          <h2>Sorry for the inconvenience</h2>
          <h3>There are no items here!</h3>
        </>
      ) : null}
    </Container>
  );
};
