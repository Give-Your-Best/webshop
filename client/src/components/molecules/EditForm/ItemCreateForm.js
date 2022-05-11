import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { itemCreateschema } from '../../../utils/validation';
import { reopenTab } from '../../../utils/helpers';
import { clothingSizeOptions, shoeSizeOptions, categories, colours } from '../../../utils/constants';
import { createItem } from '../../../services/items';
import { Button, Notification, StyledSelect } from '../../atoms';
import { StyledSubmitButton, StyledInput, StyledCheckbox, StyledError, StyledLabel } from './EditForm.styles';
import { Images } from '../Images';

export const ItemCreateForm = (data) => {
    const { token, user } = useContext(AppContext);
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleSubmit = async (values, {resetForm, setFieldValue}) => {
        const res = await createItem(values, token);
        if (res.success) {
            Notification('Success!', 'New item created', 'success');
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

                    <StyledLabel>Item Category</StyledLabel>
                    <StyledSelect name="category" >
                    {categories.map((d)=>{
                        return (<StyledSelect.Option key={d.id} value={d.id}>{d.name}</StyledSelect.Option>);
                        })}
                    </StyledSelect>
                    <StyledError name="category" component="div" />

                    <StyledLabel>Sub Category</StyledLabel>
                    <StyledSelect name="subCategory" >
                    {categories.map((d)=>{
                        return (<StyledSelect.Option key={d.id} value={d.id}>{d.name}</StyledSelect.Option>);
                        })}
                    </StyledSelect>
                    <StyledError name="subCategory" component="div" />

                    <StyledLabel>Brand
                    <StyledInput name="brand" /></StyledLabel>
                    <StyledError name="brand" component="div" />

                    <StyledLabel>Clothing size</StyledLabel>
                    <StyledSelect name="clothingSize" >
                    {clothingSizeOptions.map((d)=>{
                        return (<StyledSelect.Option key={d} value={d}>{d}</StyledSelect.Option>);
                        })}
                    </StyledSelect>
                    <StyledError name="clothingSize" component="div" />


                    <StyledLabel>Shoe size</StyledLabel>
                    <StyledSelect name="shoeSize">
                    {shoeSizeOptions.map((d)=>{
                        return (<StyledSelect.Option key={d} value={d}>{d}</StyledSelect.Option>);
                        })}
                    </StyledSelect>
                    <StyledError name="shoeSize" component="div" />

                    <StyledLabel>Colours
                    <StyledCheckbox.Group name="colors" options={colours}/></StyledLabel>
                    <StyledError name="colors" component="div" />

                    <StyledLabel>Please upload a front and back image</StyledLabel>
                    <Images uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
                    <StyledInput hidden name="photos" ></StyledInput>
                    <StyledError name="photos" component="div" />

                    <StyledSubmitButton>Create</StyledSubmitButton>
                    <Button small type="reset" onClick={() => {reopenTab('items')}}>Cancel</Button>
                </Form>
            </Formik>
        </div>
      );
}