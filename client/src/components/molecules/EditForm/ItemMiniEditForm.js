import React, { useState } from 'react';
import { Form } from 'formik-antd';
import { StyledSubmitButton, StyledInput, StyledLabel, StyledCheckbox, StyledError } from './EditForm.styles';
import { clothingSizeOptions, shoeSizeOptions, colours } from '../../../utils/constants';
import { Images } from '../Images';
import { CategoryFields } from './CategoryFields';

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

        <CategoryFields editingKey={editingKey} recordId={recordId} />

        <StyledLabel>Brand
        <StyledInput name="brand" disabled={editingKey !== recordId} /></StyledLabel>
        <StyledError name="brand" component="div" />

        <StyledLabel>Clothing sizes
        <StyledCheckbox.Group disabled={editingKey !== recordId} name="clothingSize" options={clothingSizeOptions}/></StyledLabel>
        <StyledError name="clothingSize" component="div" />

        <StyledLabel>Shoe sizes
        <StyledCheckbox.Group disabled={editingKey !== recordId} name="shoeSize" options={shoeSizeOptions}/></StyledLabel>
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
