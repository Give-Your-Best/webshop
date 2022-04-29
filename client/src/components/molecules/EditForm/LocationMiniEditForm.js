import * as React from 'react';
import { Form } from 'formik-antd';
import { ErrorMessage } from 'formik';
import { StyledSubmitButton, StyledInput } from './EditForm.styles';
import { UserSelect } from '../../atoms/UserSelect';

//admin user needs to be a dropdown listing all admin users

export const LocationMiniEditForm = ({ editingKey, recordId, users }) => {
  return (
    <Form>
        <label>Name:</label>
        <StyledInput name="name" disabled={editingKey !== recordId} />
        <ErrorMessage name="name" component="div" />
        <label>First line of address:</label>
        <StyledInput name="firstLine" disabled={editingKey !== recordId} />
        <ErrorMessage name="firstLine" component="div" />
        <label>Second line of address:</label>
        <StyledInput name="secondLine" disabled={editingKey !== recordId} />
        <ErrorMessage name="secondLine" component="div" />
        <label>Postcode:</label>
        <StyledInput name="postcode" disabled={editingKey !== recordId} />
        <ErrorMessage name="postcode" component="div" />
        <label>Give your best member:</label>
        <UserSelect users={users} selectName="adminUser" disabled={editingKey !== recordId}/>
        <ErrorMessage name="adminUser" component="div" />
        {editingKey === recordId &&<StyledSubmitButton>Save</StyledSubmitButton>} 
    </Form>
  );
};
