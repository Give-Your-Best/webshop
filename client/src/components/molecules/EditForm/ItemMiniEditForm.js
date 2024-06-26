import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'formik-antd';
import { useFormikContext } from 'formik';
import { AppContext } from '../../../context/app-context';
import { AccountContext } from '../../../context/account-context';
import {
  StyledSubmitButton,
  StyledInput,
  StyledLabel,
  StyledError,
  StyledCheckboxGroup,
  StyledSelectTags,
} from './EditForm.styles';
import RenderBatchOptions from './RenderBatchOptions';
import {
  colours,
  shoeSizeOptions,
  clothingSizeOptions,
} from '../../../utils/constants';
import { Images } from '../Images';
import { CategoryFields } from './CategoryFields';
import { getItem, getBatchItem } from '../../../services/items';
import { convertUnderscoreToDot } from '../../../utils/convertUnderscoreToDot';

export const ItemMiniEditForm = ({
  editingKey,
  recordId,
  photos,
  handleImageUpdate,
}) => {
  const { user } = useContext(AppContext);
  const { allTags } = useContext(AccountContext);

  const [uploadedImages, setUploadedImages] = useState(
    photos.sort((a, b) => b.front - a.front)
  );
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [item, setItem] = useState(null);

  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemDetails = await getItem(recordId);
        setItem(itemDetails);
        setSelectedCategory(itemDetails.category);
        setSelectedSubCategory(itemDetails.subCategory);
        if (itemDetails?.batchId) {
          const batchItemDetails = await getBatchItem(itemDetails.batchId);
          if (batchItemDetails?.batchItem.clothingSizes) {
            // Converting keys from underscore to dot -> mongoose maps don't allow for dots in their keys
            const convertedClothingSizes = convertUnderscoreToDot(
              batchItemDetails.batchItem.clothingSizes
            );
            setFieldValue('clothingSizes', convertedClothingSizes);
          }
          if (batchItemDetails?.batchItem.shoeSizes) {
            // Converting keys from underscore to dot -> mongoose maps don't allow for dots in their keys
            const convertedShoeSizes = convertUnderscoreToDot(
              batchItemDetails.batchItem.shoeSizes
            );
            setFieldValue('shoeSizes', convertedShoeSizes);
          }
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };
    fetchData();
  }, [recordId, setFieldValue]);

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

      {user.trustedDonor && user.canAddItemTags ? (
        <StyledLabel>
          Tags
          <StyledSelectTags
            mode="tags"
            name="tags"
            disabled={editingKey !== recordId}
          >
            {(allTags || []).map((tag) => (
              <StyledSelectTags.Option key={tag.name} value={tag._id}>
                {tag.name}
              </StyledSelectTags.Option>
            ))}
          </StyledSelectTags>
        </StyledLabel>
      ) : null}

      {item?.batchId ? (
        <RenderBatchOptions
          category={selectedCategory}
          subcategory={selectedSubCategory}
          editingKey={editingKey}
          recordId={recordId}
        />
      ) : (
        <>
          <StyledLabel>
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
          </StyledLabel>
          <StyledError name="shoeSize" component="div" />
        </>
      )}

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
