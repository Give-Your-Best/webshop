import React, { useState } from 'react';
import { Form } from 'formik-antd';
import { StyledSubmitButton, StyledInput, StyledLabel, StyledSelect, StyledCheckbox, StyledError } from './EditForm.styles';
import { clothingSizeOptions, shoeSizeOptions, categories, colours } from '../../../utils/constants';
import { Images } from '../Images';

export const ItemMiniEditForm = ({ editingKey, recordId, photos, handleImageUpdate }) => {
  const [uploadedImages, setUploadedImages] = useState(photos);

  return (
    <Form>
        <StyledLabel>Item Name
        <StyledInput name="name" disabled={editingKey !== recordId} /></StyledLabel>
        <StyledError name="name" component="div" />

        <StyledLabel>Item Description
        <StyledInput name="description" disabled={editingKey !== recordId} /></StyledLabel>
        <StyledError name="description" component="div" />

        <StyledLabel>Item Category</StyledLabel>
        <StyledSelect name="category" disabled={editingKey !== recordId}>
          {categories.map((d)=>{
              return (<StyledSelect.Option key={d.id} value={d.id}>{d.name}</StyledSelect.Option>);
              })}
        </StyledSelect>
        <StyledError name="category" component="div" />

        <StyledLabel>Sub Category</StyledLabel>
        <StyledSelect name="subCategory" disabled={editingKey !== recordId}>
          {categories.map((d)=>{
              return (<StyledSelect.Option key={d.id} value={d.id}>{d.name}</StyledSelect.Option>);
              })}
        </StyledSelect>
        <StyledError name="subCategory" component="div" />

        <StyledLabel>Brand
        <StyledInput name="brand" disabled={editingKey !== recordId} /></StyledLabel>
        <StyledError name="brand" component="div" />

        <StyledLabel>Clothing size</StyledLabel>
        <StyledSelect name="clothingSize" disabled={editingKey !== recordId}>
          {clothingSizeOptions.map((d)=>{
              return (<StyledSelect.Option key={d} value={d}>{d}</StyledSelect.Option>);
              })}
        </StyledSelect>
        <StyledError name="clothingSize" component="div" />


        <StyledLabel>Shoe size</StyledLabel>
        <StyledSelect name="shoeSize"  disabled={editingKey !== recordId}>
          {shoeSizeOptions.map((d)=>{
              return (<StyledSelect.Option key={d} value={d}>{d}</StyledSelect.Option>);
              })}
        </StyledSelect>
        <StyledError name="shoeSize" component="div" />

        <StyledLabel>Colours
        <StyledCheckbox.Group name="colors" disabled={editingKey !== recordId} options={colours}/></StyledLabel>
        <StyledError name="colors" component="div" />
        <Images uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} editingKey={editingKey} recordId={recordId} handleChange={handleImageUpdate} />
        <StyledInput name="photos" hidden></StyledInput>
        <StyledError name="photos" component="div" />

        {editingKey === recordId &&<StyledSubmitButton>Save</StyledSubmitButton>} 
    </Form>
  );
};
