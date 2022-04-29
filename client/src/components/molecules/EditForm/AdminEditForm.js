import * as React from 'react';
import { Form } from 'formik-antd';
import { ErrorMessage } from 'formik';
import { StyledSubmitButton, StyledInput } from './EditForm.styles';
import { StyledSelect, Button } from '../../atoms';
import { openHiddenTab } from '../../../utils/helpers';

export const AdminEditForm = (data) => {
  return (
    <Form>
        <StyledInput name="firstName" placeholder="Enter first name" />
        <ErrorMessage name="firstName" component="div" />

        <StyledInput name="lastName" placeholder="Enter last name" />
        <ErrorMessage name="lastName" component="div" />

        <StyledInput name="email" placeholder="Enter email address" />
        <ErrorMessage name="email" component="div" />

        <StyledInput name="role" placeholder="Enter role" />
        <ErrorMessage name="role" component="div" />

        <StyledSelect name="assignedRole" placeholder="Assigned role">
          {data.roles.map((d)=>{
              return (<StyledSelect.Option key={d._id} value={d._id}>{d.name}</StyledSelect.Option>);
              })}
        </StyledSelect>
        <Button small type="reset" onClick={() => {openHiddenTab('password')}}>Update Password</Button>
        <StyledSubmitButton>Save</StyledSubmitButton>
    </Form>
  );
};

