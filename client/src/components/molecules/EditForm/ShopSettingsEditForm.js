import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { shopSettingsSchema } from '../../../utils/validation';
import { updateSetting } from '../../../services/settings';
import { Notification } from '../../atoms';
import { StyledSubmitButton, StyledInputNumber, StyledError} from './EditForm.styles';

export const ShopSettingsEditForm = (data) => {
    const { token } = useContext(AppContext);

    const handleSubmit = async (values, {resetForm}) => {
        const res = await updateSetting('shopItemLimit', values.shopItemLimit, token);
        const res_2 = await updateSetting('trustedDonorLimit', values.trustedDonorLimit, token);
        if (res.success && res_2.success) {
            Notification('Success!', 'Shop settings updated', 'success');
        } else {
            Notification('Error updating shop settings', res.message, 'error')
        }
    };

    const initialValues = data.settings.reduce(
        (obj, item) => Object.assign(obj, { [item.name]: item.value }),
        {}
    );
    
    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={shopSettingsSchema}
                >
                <Form>
                    <div><label>Item Limit</label><StyledInputNumber name="shopItemLimit" placeholder="Item limit" />
                    <StyledError name="shopItemLimit" component="div" /></div>

                    <div><label>Trusted Donor Limit</label><StyledInputNumber name="trustedDonorLimit" placeholder="Trusted Donor Limit" />
                    <StyledError name="trustedDonorLimit" component="div" /></div>

                    <StyledSubmitButton>Save</StyledSubmitButton>
                </Form>
            </Formik>
        </div>
      );
}