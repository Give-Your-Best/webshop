import * as React from 'react';
import { Form } from 'formik-antd';
import { ErrorMessage } from 'formik';
import { StyledSubmitButton, StyledInput } from './EditForm.styles';
import { Button } from '../../atoms';
import { openHiddenTab } from '../../../utils/helpers';

export const UserEditForm = (data) => {
  return (
    <Form>
        <StyledInput name="firstName" placeholder="Enter first name" />
        <ErrorMessage name="firstName" component="div" />

        <StyledInput name="lastName" placeholder="Enter last name" />
        <ErrorMessage name="lastName" component="div" />

        <StyledInput name="email" placeholder="Enter email address" />
        <ErrorMessage name="email" component="div" />
        <Button small type="reset" onClick={() => {openHiddenTab('password')}}>Update Password</Button>
        <StyledSubmitButton>Save</StyledSubmitButton>
    </Form>
  );
};

