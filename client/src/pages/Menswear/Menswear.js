import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { menswearCategories, subCategories } from '../../utils/constants';
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

const MENSWEAR_GENDER = 'men,unisex';

// Maps URL params to API query params.
// /menswear           → category=menswear
// /menswear/men-tops  → category=menswear&subCategory=men-tops
// /menswear/accessories/bags → category=accessories&subCategory=bags
const resolveApiParams = (category, subCategory) => {
  if (!category) {
    return { apiCategory: 'menswear', apiSubCategory: undefined };
  }
  const isClothingSubCat = subCategories.some(
    (s) => s.id === category && s.parentCategory === 'menswear'
  );
  if (isClothingSubCat) {
    return { apiCategory: 'menswear', apiSubCategory: category };
  }
  return { apiCategory: category, apiSubCategory: subCategory };
};

const resolveHeading = (category, subCategory) => {
  if (!category) return "Men's Clothing";
  const clothingSubCat = subCategories.find(
    (s) => s.id === category && s.parentCategory === 'menswear'
  );
  if (clothingSubCat) return clothingSubCat.name;
  if (subCategory) {
    const sub = subCategories.find((s) => s.id === subCategory);
    if (sub) return sub.name;
  }
  const mCat = menswearCategories.find((m) => m.id === category);
  return mCat ? mCat.name : '';
};

const resolveBreadcrumbProps = (apiCategory, apiSubCategory) => {
  if (apiCategory === 'menswear') {
    return {
      categoryLabel: "Men's Clothing",
      categoryPath: '/menswear',
      subCategoryPath: apiSubCategory
        ? `/menswear/${apiSubCategory}`
        : undefined,
      root: undefined,
    };
  }
  // accessories, shoes, other — show Menswear as root crumb
  return {
    categoryLabel: undefined,
    categoryPath: `/menswear/${apiCategory}`,
    subCategoryPath: apiSubCategory
      ? `/menswear/${apiCategory}/${apiSubCategory}`
      : undefined,
    root: { label: 'Menswear', path: '/menswear' },
  };
};

export const Menswear = () => {
  const { category, subCategory } = useParams();
  const { apiCategory, apiSubCategory } = resolveApiParams(
    category,
    subCategory
  );
  const heading = resolveHeading(category, subCategory);
  const bcProps = resolveBreadcrumbProps(apiCategory, apiSubCategory);

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
      MENSWEAR_GENDER
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
        apiCategory,
        apiSubCategory,
        '',
        clothingSizes,
        shoeSizes,
        colours,
        MENSWEAR_GENDER
      );
      setItems(result);
      setNoItems(result.length === 0);
      setNoMoreLoad(false);
      setPage(1);
      console.log({ result });
    };

    fetchItems();
    // eslint-disable-next-line
  }, [category, subCategory, filters]);

  return (
    <Container>
      <CategoryBreadcrumbs
        category={apiCategory}
        subCategory={apiSubCategory}
        {...bcProps}
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
