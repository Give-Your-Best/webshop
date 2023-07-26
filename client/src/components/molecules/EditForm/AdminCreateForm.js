import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { adminSchema } from '../../../utils/validation';
import { createUser } from '../../../services/user';
import { Button, Notification } from '../../atoms';
import { reopenTab, sendAutoEmail } from '../../../utils/helpers';
import {
  StyledSubmitButton,
  StyledInput,
  StyledError,
} from './EditForm.styles';

export const AdminCreateForm = (data) => {
  const { token } = useContext(AppContext);

  const handleSubmit = async (values, { resetForm }) => {
    const res = await createUser(values, token);
    if (res.success) {
      sendAutoEmail('new_user', values);
      Notification('Success!', 'New team member created', 'success');
      resetForm();
      reopenTab('team');
      data.submitFunction(res.user);
    } else {
      Notification('Error creating team member', res.message, 'error');
    }
  };

  const temp = Math.random().toString(36).slice(2, 10);

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          password: temp,
          email: '',
          type: 'admin',
          approvedStatus: 'approved',
        }}
        onSubmit={handleSubmit}
        validationSchema={adminSchema}
      >
        <Form>
          <StyledInput name="firstName" placeholder="Enter first name" />
          <StyledError name="firstName" component="div" />

          <StyledInput name="lastName" placeholder="Enter last name" />
          <StyledError name="lastName" component="div" />

          <StyledInput name="email" placeholder="Enter email address" />
          <StyledError name="email" component="div" />

          <StyledInput name="role" placeholder="Enter role" />
          <StyledError name="role" component="div" />

          <StyledSubmitButton>Create</StyledSubmitButton>
          <Button
            primary
            type="reset"
            onClick={() => {
              reopenTab('team');
            }}
          >
            Cancel
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
