import * as React from 'react';
import { Form } from 'formik-antd';
import { StyledSubmitButton, StyledInput, StyledLabel, StyledError } from './EditForm.styles';
import { Button } from '../../atoms';
import { openHiddenTab } from '../../../utils/helpers';

export const AdminEditForm = (data) => {
  return (
    <Form>
        <StyledLabel>First name
        <StyledInput name="firstName" /></StyledLabel>
        <StyledError name="firstName" component="div" />

        <StyledLabel>Last name
        <StyledInput name="lastName" /></StyledLabel>
        <StyledError name="lastName" component="div" />

        <StyledLabel>Email address
        <StyledInput name="email" /></StyledLabel>
        <StyledError name="email" component="div" />

        <StyledLabel>Role
        <StyledInput name="role" placeholder="Enter role" /></StyledLabel>
        <StyledError name="role" component="div" />

        <Button primary small type="reset" onClick={() => {openHiddenTab('password')}}>Update Password</Button>
        <StyledSubmitButton>Save</StyledSubmitButton>
    </Form>
  );
};

