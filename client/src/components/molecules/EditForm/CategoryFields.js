import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { categories, subCategories } from '../../../utils/constants';
import { StyledSelect } from '../../atoms';
import { StyledError, StyledLabel, StyledRadio } from './EditForm.styles';
import { useFormikContext } from 'formik';

const GenderPickerWrapper = styled.div`
  margin: 12px 0;
`;

const GENDER_REQUIRED_CATEGORIES = ['accessories', 'shoes', 'other'];

export const CategoryFields = ({ editingKey, recordId, onCategoryChange }) => {
  const [subs, setSubs] = useState([]);
  const formikProps = useFormikContext();

  // Initialise subcategories when editing an existing item that already has a category set
  useEffect(() => {
    if (formikProps.values.category) {
      setSubs(
        subCategories.filter(
          (sub) => sub.parentCategory === formikProps.values.category
        )
      );
    }
  }, [formikProps.values.category]);

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
    const newGender = e.target.value;
    const currentSubCategory = formikProps.values.subCategory;
    const validForNewGender = subs.filter((sub) => {
      if (!sub.genderRestriction) return true;
      if (sub.genderRestriction === 'women')
        return newGender === 'women' || newGender === 'unisex';
      if (sub.genderRestriction === 'men')
        return newGender === 'men' || newGender === 'unisex';
      return true;
    });
    const subCategoryStillValid = validForNewGender.some(
      (sub) => sub.id === currentSubCategory
    );
    formikProps.setValues((prev) => ({
      ...prev,
      gender: newGender,
      subCategory: subCategoryStillValid ? prev.subCategory : '',
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
