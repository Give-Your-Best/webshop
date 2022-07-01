import * as React from 'react';
import { Form } from 'formik-antd';
import { StyledSubmitButton, StyledInput, StyledLabel, StyledError, FieldContainerHalf } from './EditForm.styles';
import { Button, Space } from '../../atoms';
import { openHiddenTab } from '../../../utils/helpers';

export const AdminEditForm = (data) => {
  return (
    <Form>
        <FieldContainerHalf>
        <StyledLabel>First name
        <StyledInput name="firstName" />
        <StyledError name="firstName" component="div" /></StyledLabel>

        <StyledLabel>Last name
        <StyledInput name="lastName" />
        <StyledError name="lastName" component="div" /></StyledLabel>

        </FieldContainerHalf>

        <StyledLabel>Email address
        <StyledInput name="email" /></StyledLabel>
        <StyledError name="email" component="div" />

        <StyledLabel>Role
        <StyledInput name="role" placeholder="Enter role" /></StyledLabel>
        <StyledError name="role" component="div" />

        <Space />

        <StyledSubmitButton>Save</StyledSubmitButton>
        <Button primary type="reset" onClick={() => {openHiddenTab('password')}}>Update Password</Button>
    </Form>
  );
};

