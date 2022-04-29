import * as React from 'react';
import { Form } from 'formik-antd';
import { ErrorMessage } from 'formik';
import { StyledSubmitButton, StyledInput, StyledInputNumber, StyledLabel } from './EditForm.styles';
import { Button } from '../../atoms/Button';

//these are all strings, select fields need to be added

export const ShopperMiniEditForm = ({ editingKey, recordId, approvalAction }) => {
  return (
    <Form>
        <StyledLabel>Name<StyledInput name="name" disabled={editingKey !== recordId} /></StyledLabel>
        <ErrorMessage name="name" component="div" />
        <StyledLabel>Email
        <StyledInput name="email" disabled={editingKey !== recordId} /></StyledLabel> 
        <ErrorMessage name="email" component="div" />
        <StyledLabel>Delivery preference
        <StyledInput name="deliveryPreference" disabled={editingKey !== recordId} /></StyledLabel> 
        <ErrorMessage name="deliveryPreference" component="div" />
        <StyledLabel>Current status
        <StyledInput name="currentStatus" disabled={editingKey !== recordId} /></StyledLabel> 
        <ErrorMessage name="currentStatus" component="div" />
        <StyledLabel>Referred by
        <StyledInput name="referredBy" disabled={editingKey !== recordId} /></StyledLabel> 
        <ErrorMessage name="referredBy" component="div" />
        <StyledLabel>Shopping for how many
        <StyledInputNumber name="shoppingFor" disabled={editingKey !== recordId} /></StyledLabel> 
        <ErrorMessage name="shoppingFor" component="div" />
        {editingKey === recordId && !approvalAction &&<StyledSubmitButton>Save</StyledSubmitButton>} 
        {approvalAction && <Button small data-action='approve' onClick={approvalAction}>Approve</Button>}  
        {approvalAction && <Button small data-action='reject' onClick={approvalAction}>Reject</Button>}
    </Form>
  );
};
