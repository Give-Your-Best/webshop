import * as React from 'react';
import { Form } from 'formik-antd';
import { StyledSubmitButton, StyledInput, StyledError } from './EditForm.styles';
import { UserSelect } from '../../atoms/UserSelect';

//admin user needs to be a dropdown listing all admin users

export const LocationMiniEditForm = ({ editingKey, recordId, users }) => {
  return (
    <Form>
        <label>Name:</label>
        <StyledInput name="name" disabled={editingKey !== recordId} />
        <StyledError name="name" component="div" />
        <label>First line of address:</label>
        <StyledInput name="firstLine" disabled={editingKey !== recordId} />
        <StyledError name="firstLine" component="div" />
        <label>Second line of address:</label>
        <StyledInput name="secondLine" disabled={editingKey !== recordId} />
        <StyledError name="secondLine" component="div" />
        <label>Postcode:</label>
        <StyledInput name="postcode" disabled={editingKey !== recordId} />
        <StyledError name="postcode" component="div" />
        <label>Give your best member:</label>
        <UserSelect users={users} selectName="adminUser" disabled={editingKey !== recordId}/>
        <StyledError name="adminUser" component="div" />
        {editingKey === recordId &&<StyledSubmitButton>Save</StyledSubmitButton>} 
    </Form>
  );
};
