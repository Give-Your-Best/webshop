import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { subCategories } from '../../../utils/constants';
import { Container, Button } from '../../atoms';
import { ItemCard, Filters } from '../../molecules';
import { CategoryBreadcrumbs } from '../../atoms';
import { getItems } from '../../../services/items';
import { ItemsWrapper, PageWrapper, Heading } from './ShopSection.styles';

// --- Helper functions for subcategory lookup and canonicalization ---
// Finds the canonical subCategory object by id or dash/slash variant
const findCanonicalSubCategory = (id) => {
  return subCategories.find(
    (s) => s.id === id || s.id.replace('/', '-') === id
  );
};

// Checks if a category is a clothing subcategory for the given config
const isClothingSubCat = (config, category) => {
  return subCategories.some(
    (s) =>
      s.id === category && s.parentCategory === config.clothingParentCategory
  );
};

/**
 * Maps route params and config to API query params for getItems.
 * Handles special cases for navGroups, clothing, and legacy subCategory variants.
 */
const resolveApiParams = (config, category, subCategory) => {
  // No category selected: return default API category
  if (!category) {
    return {
      apiCategory: config.gender ? undefined : config.primaryApiCategory,
      apiSubCategory: undefined,
    };
  }

  // Clothing root: pass through subCategory if present
  if (category === 'clothing') {
    return {
      apiCategory: config.primaryApiCategory,
      apiSubCategory: subCategory || undefined,
    };
  }

  // Nav group (e.g. 'kids', 'baby-toddler')
  if (config.navGroupsById && config.navGroupsById[category]) {
    const navGroup = config.navGroupsById[category];
    if (subCategory) {
      // Handle dash/slash variant for subCategory
      const actualId = findCanonicalSubCategory(subCategory);
      return {
        apiCategory: config.primaryApiCategory,
        apiSubCategory: actualId ? actualId.id : subCategory,
      };
    }
    // No subCategory: query all subCatIds in the group
    return {
      apiCategory: config.primaryApiCategory,
      apiSubCategory: navGroup.subCatIds.join(','),
    };
  }

  // Clothing subcategory (e.g. 'dresses' under 'women')
  if (isClothingSubCat(config, category)) {
    return {
      apiCategory: config.primaryApiCategory,
      apiSubCategory: category,
    };
  }

  // Fallback: pass params directly
  return {
    apiCategory: category,
    apiSubCategory: subCategory,
  };
};

/**
 * Determines the heading to display based on current category and subCategory.
 * Handles special cases for navGroups, clothing, and legacy subCategory variants.
 */
const resolveHeading = (config, category, subCategory) => {
  // No category: show default heading
  if (!category) return config.defaultHeading;

  // Clothing root: show subCategory name if present
  if (category === 'clothing') {
    if (subCategory) {
      const sub = subCategories.find((s) => s.id === subCategory);
      if (sub) return sub.name;
    }
    return config.clothingHeading || config.defaultHeading;
  }

  // Nav group (e.g. 'kids', 'baby-toddler')
  if (config.navGroupsById && config.navGroupsById[category]) {
    if (subCategory) {
      const sub = findCanonicalSubCategory(subCategory);
      if (sub) return sub.name;
    }
    return config.navGroupsById[category].name;
  }

  // Clothing subcategory (e.g. 'dresses' under 'women')
  const clothingSubCat = subCategories.find(
    (s) =>
      s.id === category && s.parentCategory === config.clothingParentCategory
  );
  if (clothingSubCat) return clothingSubCat.name;

  // Standalone subCategory (not in navGroup)
  if (subCategory) {
    const sub = subCategories.find((s) => s.id === subCategory);
    if (sub) return sub.name;
  }

  // Top-level category (e.g. 'accessories', 'shoes')
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
      config.gender || undefined,
      config.includeLegacy || false
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
        config.gender || undefined,
        config.includeLegacy || false
      );
      if (!Array.isArray(result)) {
        setNoItems(true);
        return;
      }
      setItems(result);
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
