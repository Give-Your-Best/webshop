import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import {
  StyledInput,
  StyledLabel,
  StyledError,
  StyledCheckboxGroup,
} from './EditForm.styles';
import {
  clothingSizeOptions,
  shoeSizeOptions,
  colours,
} from '../../../utils/constants';
import { AutoSave } from './Autosave';
import { Images } from '../Images';
import { CategoryFields } from './CategoryFields';

export const ItemMiniEditForm = ({ editingKey, recordId, photos }) => {
  const { token } = useContext(AppContext);
  const [uploadedImages, setUploadedImages] = useState(
    photos.sort((a, b) => b.front - a.front)
  );

  const disabled = editingKey !== recordId;

  return (
    <Form>
      <StyledLabel>
        Item Name
        <StyledInput name="name" disabled={disabled} />
      </StyledLabel>
      <StyledError name="name" component="div" />
      <StyledLabel>
        Item Description
        <StyledInput name="description" disabled={disabled} />
      </StyledLabel>
      <StyledError name="description" component="div" />
      <CategoryFields editingKey={editingKey} recordId={recordId} />
      <StyledLabel>
        Brand
        <StyledInput name="brand" disabled={disabled} />
      </StyledLabel>
      <StyledError name="brand" component="div" />
      <StyledLabel>
        Clothing sizes
        <StyledCheckboxGroup
          disabled={disabled}
          name="clothingSize"
          options={clothingSizeOptions}
        />
      </StyledLabel>
      <StyledError name="clothingSize" component="div" />
      <StyledLabel>
        Shoe sizes
        <StyledCheckboxGroup
          disabled={disabled}
          name="shoeSize"
          options={shoeSizeOptions}
        />
      </StyledLabel>
      <StyledError name="shoeSize" component="div" />
      <StyledLabel>
        Colours
        <StyledCheckboxGroup
          name="colors"
          disabled={disabled}
          options={colours}
        />
      </StyledLabel>
      <StyledError name="colors" component="div" />
      <Images
        token={token}
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
        editingKey={editingKey}
        recordId={recordId}
      />
      <StyledInput name="photos" hidden></StyledInput>
      <StyledError name="photos" component="div" />

      {disabled ? null : <AutoSave />}
    </Form>
  );
};
