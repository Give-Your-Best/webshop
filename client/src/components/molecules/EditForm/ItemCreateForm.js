import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { itemCreateschema } from '../../../utils/validation';
import { reopenTab, sendAutoEmail } from '../../../utils/helpers';
import { clothingSizeOptions, shoeSizeOptions, colours } from '../../../utils/constants';
import { createItem } from '../../../services/items';
import { Button, Notification } from '../../atoms';
import { StyledSubmitButton, StyledInput, StyledError, StyledLabel, StyledCheckboxGroup } from './EditForm.styles';
import { Images } from '../Images';
import { CategoryFields } from './CategoryFields';

export const ItemCreateForm = (data) => {
    const { token, user } = useContext(AppContext);
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleSubmit = async (values, {resetForm, setFieldValue}) => {
        const res = await createItem(values, token);
        if (res.success) {
            Notification('Success!', 'New item created', 'success');
            if (!user.trustedDonor) {
                sendAutoEmail('new_item_approve');
            } 
            resetForm();
            setFieldValue("photos", []);
            setUploadedImages([]);
            data.submitFunction(res.item);
            reopenTab('items');
        } else {
            Notification('Error creating item', res.message, 'error')
        }
        return
    };

    return (
        <div>
            <Formik
            initialValues={{name: "", description: "", category: "", subCategory: "", brand: "", photos: [], donorId: user.id}}
                validationSchema= {itemCreateschema}
                onSubmit={handleSubmit}
                >
                <Form>
                    <StyledLabel>Item Name
                    <StyledInput name="name" /></StyledLabel>
                    <StyledError name="name" component="div" />

                    <StyledLabel>Item Description
                    <StyledInput name="description" /></StyledLabel>
                    <StyledError name="description" component="div" />

                    <CategoryFields />

                    <StyledLabel>Brand
                    <StyledInput name="brand" /></StyledLabel>
                    <StyledError name="brand" component="div" />

                    <StyledLabel>Clothing size
                    <StyledCheckboxGroup name="clothingSize" options={clothingSizeOptions}/></StyledLabel>
                    <StyledError name="clothingSize" component="div" />

                    <StyledLabel>Shoe size
                    <StyledCheckboxGroup name="shoeSize" options={shoeSizeOptions}/></StyledLabel>
                    <StyledError name="shoeSize" component="div" />

                    <StyledLabel>Colours
                    <StyledCheckboxGroup name="colors" options={colours}/></StyledLabel>
                    <StyledError name="colors" component="div" />

                    <StyledLabel>Please upload a front and back image</StyledLabel>
                    <Images uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
                    <StyledInput hidden name="photos" ></StyledInput>
                    <StyledError name="photos" component="div" />

                    <StyledSubmitButton>Upload Item</StyledSubmitButton>
                    <Button primary type="reset" onClick={() => {reopenTab('items')}}>Cancel</Button>
                </Form>
            </Formik>
        </div>
      );
}