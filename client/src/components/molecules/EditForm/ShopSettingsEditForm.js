import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { shopSettingsSchema } from '../../../utils/validation';
import { updateSetting } from '../../../services/settings';
import { Notification } from '../../atoms';
import {
  StyledSubmitButton,
  StyledInputNumber,
  StyledError,
  StyledInput,
  StyledLabel,
  InfoNote,
} from './EditForm.styles';

export const ShopSettingsEditForm = (data) => {
  const { token } = useContext(AppContext);

  const handleSubmit = async (values) => {
    const res = await updateSetting(
      'shopItemLimit',
      values.shopItemLimit,
      token
    );
    const res_2 = await updateSetting(
      'trustedDonorLimit',
      values.trustedDonorLimit,
      token
    );
    const res_3 = await updateSetting('shop_email', values.shop_email, token);
    if (res.success && res_2.success && res_3.success) {
      Notification('Success!', 'Shop settings updated', 'success');
    } else {
      Notification('Error updating shop settings', res.message, 'error');
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
          <StyledLabel>
            Item Limit
            <StyledInputNumber name="shopItemLimit" placeholder="Item limit" />
            <StyledError name="shopItemLimit" component="div" />
          </StyledLabel>

          <StyledLabel>
            Trusted Donor Limit
            <StyledInputNumber
              name="trustedDonorLimit"
              placeholder="Trusted Donor Limit"
            />
            <StyledError name="trustedDonorLimit" component="div" />
          </StyledLabel>

          <StyledLabel>
            Shop Email{' '}
            <InfoNote>
              ! - This will update the email associated with your email provider
            </InfoNote>
            <StyledInput name="shop_email" placeholder="Shop Email" />
            <StyledError name="shop_email" component="div" />
          </StyledLabel>

          <StyledSubmitButton>Save</StyledSubmitButton>
        </Form>
      </Formik>
    </div>
  );
};
