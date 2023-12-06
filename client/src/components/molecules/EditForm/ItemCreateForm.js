import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { itemCreateschema } from '../../../utils/validation';
import { reopenTab, sendAutoEmail } from '../../../utils/helpers';
import { colours } from '../../../utils/constants';
import { createItem, createBatchItem } from '../../../services/items';
import { Button, Notification } from '../../atoms';
import {
  StyledSubmitButton,
  StyledInput,
  StyledError,
  StyledLabel,
  StyledCheckboxGroup,
  StyledSwitch,
} from './EditForm.styles';
import { Images } from '../Images';
import { CategoryFields } from './CategoryFields';
import RenderBatchOptions from './RenderBatchOptions';
// import RenderItemOptions from './RenderItemOptions';
import { shoeSizeOptions, clothingSizeOptions } from '../../../utils/constants';

export const ItemCreateForm = (data) => {
  const { token, user } = useContext(AppContext);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showBatchOptions, setShowBatchOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleCategoryChange = (category, subCategory) => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
  };

  const handleSwitchChange = (checked) => {
    setShowBatchOptions(checked);
  };

  const handleSubmit = async (values, { resetForm, setFieldValue }) => {
    let res;
    if (showBatchOptions === true) {
      res = await createBatchItem(values, token);
    } else {
      res = await createItem(values, token);
    }
    if (res.success) {
      Notification('Success!', 'New item created', 'success');
      if (!user.trustedDonor) {
        sendAutoEmail('new_item_approve');
      }
      resetForm();
      setFieldValue('photos', []);
      setUploadedImages([]);
      data.submitFunction(res.item);
      reopenTab('items');
    } else {
      Notification('Error creating item', res.message, 'error');
    }
    return;
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          description: '',
          category: '',
          subCategory: '',
          brand: '',
          photos: [],
          donorId: user.id,
        }}
        validationSchema={itemCreateschema}
        onSubmit={handleSubmit}
      >
        <Form>
          {user.canAddItemInBulk && (
            <>
              <StyledLabel>Bulk Item?</StyledLabel>
              <StyledSwitch
                name="showBatchOptions"
                onChange={handleSwitchChange}
              />
            </>
          )}

          <StyledLabel>
            Item Name
            <StyledInput name="name" />
          </StyledLabel>
          <StyledError name="name" component="div" />

          <StyledLabel>
            Item Description
            <StyledInput name="description" />
          </StyledLabel>
          <StyledError name="description" component="div" />

          <CategoryFields onCategoryChange={handleCategoryChange} />

          <StyledLabel>
            Brand
            <StyledInput name="brand" />
          </StyledLabel>
          <StyledError name="brand" component="div" />

          {showBatchOptions ? (
            <RenderBatchOptions
              category={selectedCategory}
              subcategory={selectedSubCategory}
            />
          ) : (
            <>
              <StyledLabel>
                Clothing size
                <StyledCheckboxGroup
                  name="clothingSize"
                  options={clothingSizeOptions}
                />
              </StyledLabel>
              <StyledError name="clothingSize" component="div" />

              <StyledLabel>
                Shoe size
                <StyledCheckboxGroup
                  name="shoeSize"
                  options={shoeSizeOptions}
                />
              </StyledLabel>
              <StyledError name="shoeSize" component="div" />
            </>
          )}

          <StyledLabel>
            Colours
            <StyledCheckboxGroup name="colors" options={colours} />
          </StyledLabel>
          <StyledError name="colors" component="div" />

          <StyledLabel>Please upload a front and back image</StyledLabel>
          <Images
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
          <StyledInput hidden name="photos"></StyledInput>
          <StyledError name="photos" component="div" />

          <StyledSubmitButton>Upload Item</StyledSubmitButton>
          <Button
            primary
            type="reset"
            onClick={() => {
              reopenTab('items');
            }}
          >
            Cancel
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
