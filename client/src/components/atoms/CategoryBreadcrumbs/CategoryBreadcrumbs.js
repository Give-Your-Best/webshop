import * as React from 'react';
import { StyledBreadcrumbs } from './CategoryBreadcrumbs.styles';
import { categories, subCategories } from '../../../utils/constants';
import { useHistory } from 'react-router-dom';

export const CategoryBreadcrumbs = ({ category, subCategory, donor }) => {
  let history = useHistory();

  let categoryName = '';
  let subCategoryName = '';

  categories.forEach((c) => {
    if (c.id === category) {
      categoryName = c.name;
    }
  });

  subCategories.forEach((c) => {
    if (c.id === subCategory) {
      subCategoryName = c.name;
    }
  });

  return category ? (
    <StyledBreadcrumbs separator=">">
      <StyledBreadcrumbs.Item onClick={() => history.push(`/`)}>
        Home
      </StyledBreadcrumbs.Item>
      <StyledBreadcrumbs.Item
        onClick={() => history.push(`/products/${category}`)}
      >
        {categoryName}
      </StyledBreadcrumbs.Item>
      {subCategoryName ? (
        <StyledBreadcrumbs.Item
          onClick={() => history.push(`/products/${category}/${subCategory}`)}
        >
          {subCategoryName}
        </StyledBreadcrumbs.Item>
      ) : (
        ''
      )}
    </StyledBreadcrumbs>
  ) : donor ? (
    <StyledBreadcrumbs separator=">">
      <StyledBreadcrumbs.Item onClick={() => history.push(`/`)}>
        Home
      </StyledBreadcrumbs.Item>
      <StyledBreadcrumbs.Item onClick={() => history.push(`/`)}>
        Donor Products
      </StyledBreadcrumbs.Item>
    </StyledBreadcrumbs>
  ) : (
    ''
  );
};
