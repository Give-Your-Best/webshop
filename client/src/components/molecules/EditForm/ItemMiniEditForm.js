import React, { useState, useEffect } from 'react';
import { Form } from 'formik-antd';
import {
  StyledSubmitButton,
  StyledInput,
  StyledLabel,
  StyledError,
  StyledCheckboxGroup,
} from './EditForm.styles';
import RenderBatchOptions from './RenderBatchOptions';
import RenderItemOptions from './RenderItemOptions';
import { colours } from '../../../utils/constants';
import { Images } from '../Images';
import { CategoryFields } from './CategoryFields';
import { getItem } from '../../../services/items';

export const ItemMiniEditForm = ({
  editingKey,
  recordId,
  photos,
  handleImageUpdate,
}) => {
  const [uploadedImages, setUploadedImages] = useState(
    photos.sort((a, b) => b.front - a.front)
  );

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      // Fetch the item details using recordId
      const itemDetails = await getItem(recordId);
      console.log('itemDetails: ', itemDetails);
      setItem(itemDetails);
      setSelectedCategory(itemDetails?.category || '');
      setSelectedSubCategory(itemDetails?.subCategory || '');
    };

    fetchItemDetails();
  }, [recordId]);

  const handleCategoryChange = (category, subCategory) => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
  };

  if (!item) {
    // Render loading state or return null while waiting for the item details to be fetched
    return <div>Loading...</div>;
  }

  return (
    <Form>
      <StyledLabel>
        Item Name
        <StyledInput name="name" disabled={editingKey !== recordId} />
      </StyledLabel>
      <StyledError name="name" component="div" />

      <StyledLabel>
        Item Description
        <StyledInput name="description" disabled={editingKey !== recordId} />
      </StyledLabel>
      <StyledError name="description" component="div" />

      <CategoryFields
        editingKey={editingKey}
        recordId={recordId}
        onCategoryChange={handleCategoryChange}
      />

      <StyledLabel>
        Brand
        <StyledInput name="brand" disabled={editingKey !== recordId} />
      </StyledLabel>
      <StyledError name="brand" component="div" />

      {item?.batchId ? (
        <RenderBatchOptions
          category={selectedCategory}
          subcategory={selectedSubCategory}
          editingKey={editingKey}
          recordId={recordId}
        />
      ) : (
        <>
          <RenderItemOptions
            category={selectedCategory}
            subcategory={selectedSubCategory}
            editingKey={editingKey}
            recordId={recordId}
          />
        </>
      )}

      {/* <StyledLabel>
        Clothing sizes
        <StyledCheckboxGroup
          disabled={editingKey !== recordId}
          name="clothingSize"
          options={clothingSizeOptions}
        />
      </StyledLabel>
      <StyledError name="clothingSize" component="div" />

      <StyledLabel>
        Shoe sizes
        <StyledCheckboxGroup
          disabled={editingKey !== recordId}
          name="shoeSize"
          options={shoeSizeOptions}
        />
      </StyledLabel> */}
      <StyledError name="shoeSize" component="div" />

      <StyledLabel>
        Colours
        <StyledCheckboxGroup
          name="colors"
          disabled={editingKey !== recordId}
          options={colours}
        />
      </StyledLabel>
      <StyledError name="colors" component="div" />
      <Images
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
        editingKey={editingKey}
        recordId={recordId}
        handleChange={handleImageUpdate}
      />
      <StyledInput name="photos" hidden></StyledInput>
      <StyledError name="photos" component="div" />

      {editingKey === recordId && <StyledSubmitButton>Save</StyledSubmitButton>}
    </Form>
  );
};
