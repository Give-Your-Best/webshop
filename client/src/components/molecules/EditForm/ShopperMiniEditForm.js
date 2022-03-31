import * as React from 'react';
import { Form } from 'formik-antd';
import { ErrorMessage } from 'formik';
import { StyledSubmitButton, StyledInput, StyledInputNumber } from './EditForm.styles';
import { Button } from '../../atoms/Button';

//these are all strings, select fields need to be added

export const ShopperMiniEditForm = ({ editingKey, recordId, approvalAction }) => {
  console.log('ere')
  console.log(approvalAction)
  return (
    <Form>
        <label>Name:</label>
        <StyledInput name="name" disabled={editingKey !== recordId} />
        <ErrorMessage name="name" component="div" />
        <label>Email:</label> 
        <StyledInput name="email" disabled={editingKey !== recordId} />
        <ErrorMessage name="email" component="div" />
        <label>Username:</label>
        <StyledInput name="username" disabled={editingKey !== recordId} />
        <ErrorMessage name="username" component="div" />
        <label>Delivery preference:</label>
        <StyledInput name="deliveryPreference" disabled={editingKey !== recordId} />
        <ErrorMessage name="deliveryPreference" component="div" />
        <label>Current status:</label>
        <StyledInput name="currentStatus" disabled={editingKey !== recordId} />
        <ErrorMessage name="currentStatus" component="div" />
        <label>Referred by:</label>
        <StyledInput name="referredBy" disabled={editingKey !== recordId} />
        <ErrorMessage name="referredBy" component="div" />
        <label>Shopping for how many:</label>
        <StyledInputNumber name="shoppingFor" disabled={editingKey !== recordId} />
        <ErrorMessage name="shoppingFor" component="div" />
        {editingKey === recordId && !approvalAction &&<StyledSubmitButton>Save</StyledSubmitButton>} 
        {approvalAction && <Button small data-action='approve' onClick={approvalAction}>Approve</Button>}  
        {approvalAction && <Button small data-action='reject' onClick={approvalAction}>Reject</Button>}  
        {approvalAction && <Button small data-action='info' onClick={approvalAction}>More info</Button>}   
    </Form>
  );
};
