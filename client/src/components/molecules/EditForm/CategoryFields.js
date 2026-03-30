import React, { useState } from 'react';
import styled from 'styled-components';
import { categories, subCategories } from '../../../utils/constants';
import { StyledSelect } from '../../atoms';
import { StyledError, StyledLabel, StyledRadio } from './EditForm.styles';
import { useFormikContext } from 'formik';

const GenderPickerWrapper = styled.div`
  margin: 12px 0;
`;

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

  const selectedGender = formikProps.values.gender;

  const filteredSubs = subs.filter((sub) => {
    if (!sub.genderRestriction) return true;
    if (sub.genderRestriction === 'women')
      return selectedGender === 'women' || selectedGender === 'unisex';
    if (sub.genderRestriction === 'men')
      return selectedGender === 'men' || selectedGender === 'unisex';
    return true;
  });

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

  const handleGenderChange = (e) => {
    formikProps.setValues((prev) => ({
      ...prev,
      gender: e.target.value,
      subCategory: '',
    }));
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

      {GENDER_REQUIRED_CATEGORIES.includes(formikProps.values.category) && (
        <GenderPickerWrapper>
          <StyledLabel>Who is this for?</StyledLabel>
          <StyledRadio.Group
            name="gender"
            disabled={editingKey !== recordId}
            onChange={handleGenderChange}
          >
            <StyledRadio value="women">Women</StyledRadio>
            <StyledRadio value="men">Men</StyledRadio>
            {formikProps.values.category !== 'shoes' && (
              <StyledRadio value="unisex">Unisex</StyledRadio>
            )}
          </StyledRadio.Group>
          <StyledError name="gender" component="div" />
        </GenderPickerWrapper>
      )}

      <StyledLabel>Sub Category</StyledLabel>
      <StyledSelect
        name="subCategory"
        disabled={editingKey !== recordId}
        onChange={handleSubCategoryChange}
      >
        {filteredSubs.map((d) => {
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
