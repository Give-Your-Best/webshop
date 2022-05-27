import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { shopperCreateSchema } from '../../../utils/validation';
import { reopenTab } from '../../../utils/helpers';
import { clothingSizeOptions, shoeSizeOptions, currentStatus } from '../../../utils/constants';
import { createUser } from '../../../services/user';
import { Button, Notification, StyledSelect } from '../../atoms';
import { StyledSubmitButton, StyledInput, StyledCheckbox, StyledInputNumber, StyledError } from './EditForm.styles';

export const ShopperCreateForm = (data) => {
    const { token } = useContext(AppContext);
    const handleSubmit = async (values, {resetForm}) => {
        if (!values.shareAddress) {
            Object.assign(values, {'deliveryPreference': 'via gyb'})
        }
        const res = await createUser(values, token);
        if (res.success) {
            Notification('Success!', 'New shopper created', 'success');
            resetForm();
            reopenTab('shopper');
            data.submitFunction(res.user, 'shopper');
        } else {
            Notification('Error creating shopper', res.message, 'error')
        }
        return
    };
    const temp = Math.random().toString(36).slice(2, 10);

    return (
        <div>
            <Formik
                initialValues={{ firstName: '', lastName: "", password: temp, email: '', type: 'shopper', approvedStatus: 'approved', clothingSize: [], shoeSize: [], currentStatus: '', referredBy: '', shoppingFor: 1, deliveryAddress: {}, deliveryPreference: 'direct', shareAddress: true }}
                validationSchema= {shopperCreateSchema}
                onSubmit={handleSubmit}
                >
                <Form>
                    <StyledInput name="email" placeholder="Enter email" />
                    <StyledError name="email" component="div" />

                    <StyledInput name="firstName" placeholder="Enter first name" />
                    <StyledError name="firstName" component="div" />

                    <StyledInput name="lastName" placeholder="Enter last name" />
                    <StyledError name="lastName" component="div" />

                    <StyledInput name="deliveryAddress.firstLine" placeholder="Enter first line of address" />
                    <StyledError name="deliveryAddress.firstLine" component="div" />

                    <StyledInput name="deliveryAddress.secondLine" placeholder="Enter second line of address" />
                    <StyledError name="deliveryAddress.secondLine" component="div" />

                    <StyledInput name="deliveryAddress.postcode" placeholder="Enter postcode" />
                    <StyledError name="deliveryAddress.postcode" component="div" />

                    <div>
                        <StyledCheckbox name="shareAddress">Share address with donors</StyledCheckbox>
                        <StyledError name="shareAddress" component="div" />
                    </div>

                    <StyledSelect name="currentStatus" placeholder="Current status">
                        {currentStatus.map((d)=>{
                            return (<StyledSelect.Option key={d} value={d}>{d}</StyledSelect.Option>);
                        })}
                    </StyledSelect>
                    <StyledError name="type" component="div" />

                    <label>Clothing sizes</label>
                    <StyledCheckbox.Group name="clothingSize" options={clothingSizeOptions} />

                    <label>Shoe sizes</label>
                    <StyledCheckbox.Group name="shoeSize" options={shoeSizeOptions} />

                    <StyledInput name="referredBy" placeholder="Who referred them?" />
                    <StyledError name="referredBy" component="div" />

                    <div>
                        <label>Shopping for more than one person? If so how many?</label>
                        <StyledInputNumber name="shoppingFor" />
                        <StyledError name="shoppingFor" component="div" />
                    </div>

                    <StyledSubmitButton>Create</StyledSubmitButton>
                    <Button primary small type="reset" onClick={() => {reopenTab('shopper')}}>Cancel</Button>
                </Form>
            </Formik>
        </div>
      );
}