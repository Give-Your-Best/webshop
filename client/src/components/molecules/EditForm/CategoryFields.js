import React, { useState } from 'react';
import { categories, subCategories } from '../../../utils/constants';
import { StyledSelect } from '../../atoms';
import { StyledError, StyledLabel, StyledRadio } from './EditForm.styles';
import { useFormikContext } from 'formik';

export const CategoryFields = ({ editingKey, recordId, onCategoryChange }) => {
  const [subs, setSubs] = useState([]);
  const formikProps = useFormikContext();
  const GENDER_REQUIRED_CATEGORIES = ['accessories', 'shoes', 'other'];

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
    formikProps.setFieldValue('gender', '');
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

      {GENDER_REQUIRED_CATEGORIES.includes(formikProps.values.category) && (
        <div>
          <StyledLabel>Who is this for?</StyledLabel>
          <StyledRadio.Group name="gender" disabled={editingKey !== recordId}>
            <StyledRadio value="women">Women</StyledRadio>
            <StyledRadio value="men">Men</StyledRadio>
            <StyledRadio value="unisex">Unisex</StyledRadio>
          </StyledRadio.Group>
          <StyledError name="gender" component="div" />
        </div>
      )}
    </div>
  );
};
