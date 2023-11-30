import React, { useState } from 'react';
import { categories, subCategories } from '../../../utils/constants';
import { StyledSelect } from '../../atoms';
import { StyledError, StyledLabel } from './EditForm.styles';
import { useFormikContext } from 'formik';

export const CategoryFields = ({ editingKey, recordId, onCategoryChange }) => {
  const [subs, setSubs] = useState([]);
  const formikProps = useFormikContext();

  //intialise subcategory
  if (!subs.length && formikProps.values.category) {
    setSubs(
      subCategories.filter((sub) => {
        return sub.parentCategory === formikProps.values.category;
      })
    );
  }

  const handleChange = (cat) => {
    //update subcategory based on parent category value
    formikProps.setFieldValue('subCategory', '');
    setSubs(
      subCategories.filter((sub) => {
        return sub.parentCategory === cat;
      })
    );
    onCategoryChange(cat, formikProps.values.subCategory);
  };

  const handleSubCategoryChange = (subCategory) => {
    onCategoryChange(formikProps.values.category, subCategory);
  };

  return (
    <div>
      <StyledLabel>Item Category</StyledLabel>
      <StyledSelect
        name="category"
        onChange={handleChange}
        disabled={editingKey !== recordId}
      >
        {categories.map((d) => {
          return (
            <StyledSelect.Option key={d.id} value={d.id}>
              {d.name}
            </StyledSelect.Option>
          );
        })}
      </StyledSelect>
      <StyledError name="category" component="div" />

      <StyledLabel>Sub Category</StyledLabel>
      <StyledSelect
        name="subCategory"
        disabled={editingKey !== recordId}
        onChange={handleSubCategoryChange}
      >
        {subs.map((d) => {
          return (
            <StyledSelect.Option key={d.id} value={d.id}>
              {d.name}
            </StyledSelect.Option>
          );
        })}
      </StyledSelect>
      <StyledError name="subCategory" component="div" />
    </div>
  );
};
