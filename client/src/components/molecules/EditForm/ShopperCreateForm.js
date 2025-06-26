import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { shopperCreateSchema } from '../../../utils/validation';
import { reopenTab } from '../../../utils/helpers';
import { createUser } from '../../../services/user';
import { Button, Notification } from '../../atoms';
import { StyledSubmitButton } from './EditForm.styles';
import { UserEditForm } from './UserEditForm';
import { sendAutoEmail } from '../../../utils/helpers';

export const ShopperCreateForm = (data) => {
  const { token } = useContext(AppContext);
  const handleSubmit = async (values, { resetForm }) => {
    if (!values.shareAddress) {
      Object.assign(values, { deliveryPreference: 'via-gyb' });
    }
    const res = await createUser(values, token);
    if (res.success) {
      sendAutoEmail('new_user', values);
      Notification('Success!', 'New shopper created', 'success');
      resetForm();
      reopenTab('shopper');
      data.submitFunction(res.user, 'shopper');
    } else {
      Notification('Error creating shopper', res.message, 'error');
    }
    return;
  };
  const temp = Math.random().toString(36).slice(2, 12);

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          password: temp,
          email: '',
          type: 'shopper',
          approvedStatus: 'approved',
          clothingSize: [],
          shoeSize: [],
          currentStatus: '',
          referredBy: '',
          shoppingFor: '1',
          shoppingForChildren: '0',
          deliveryAddress: {},
          deliveryPreference: 'direct',
          shareAddress: true,
        }}
        validationSchema={shopperCreateSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <UserEditForm type="shopper" admin="admin" />

          <StyledSubmitButton>Create</StyledSubmitButton>
          <Button
            primary
            type="reset"
            onClick={() => {
              reopenTab('shopper');
            }}
          >
            Cancel
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
