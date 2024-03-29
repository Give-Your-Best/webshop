import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { shopperCreateSchema, passwordSchema } from '../../../utils/validation';
import { sendAutoEmail } from '../../../utils/helpers';
import { register } from '../../../services/user';
import { Notification } from '../../atoms';
import { StyledSubmitButton, SubHead } from './EditForm.styles';
import { UserEditForm } from './UserEditForm';

export const ShopperSignUpForm = () => {
  let history = useHistory();

  const handleSubmit = async (values) => {
    values.email = values.email.toLowerCase();
    const res = await register(values);
    if (res.success) {
      Notification(
        'Success!',
        'Signed Up! You will hear from us soon',
        'success'
      );
      sendAutoEmail('sign_up', values);
      sendAutoEmail('new_signup');
      history.push('/');
    } else {
      Notification('Error signing up', res.message, 'success');
    }
  };

  return (
    <div>
      <SubHead>Shopper Sign Up</SubHead>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          password: '',
          email: '',
          type: 'shopper',
          shareAddress: true,
          deliveryPreference: 'direct',
        }}
        validationSchema={shopperCreateSchema.concat(passwordSchema)}
        onSubmit={handleSubmit}
      >
        <Form>
          <UserEditForm type="shopper" signUp="shopper" />
          <StyledSubmitButton>Sign Up</StyledSubmitButton>
        </Form>
      </Formik>
    </div>
  );
};
