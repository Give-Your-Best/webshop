import * as React from 'react';
import { Form } from 'formik-antd';
import { StyledSubmitButton, StyledInput, StyledInputNumber, StyledLabel, StyledError } from './EditForm.styles';
import { Button } from '../../atoms/Button';

//these are all strings, select fields need to be added

export const ShopperMiniEditForm = ({ editingKey, recordId, approvalAction }) => {
  return (
    <Form>
        <StyledLabel>First name
        <StyledInput name="firstName" disabled={editingKey !== recordId} /></StyledLabel>
        <StyledError name="firstName" component="div" />
        <StyledLabel>Last name
        <StyledInput name="lastName" disabled={editingKey !== recordId} /></StyledLabel>
        <StyledError name="lastName" component="div" />
        <StyledLabel>Email
        <StyledInput name="email" disabled={editingKey !== recordId} /></StyledLabel> 
        <StyledError name="email" component="div" />
        <StyledLabel>Delivery preference
        <StyledInput name="deliveryPreference" disabled={editingKey !== recordId} /></StyledLabel> 
        <StyledError name="deliveryPreference" component="div" />
        <StyledLabel>Current status
        <StyledInput name="currentStatus" disabled={editingKey !== recordId} /></StyledLabel> 
        <StyledError name="currentStatus" component="div" />
        <StyledLabel>Referred by
        <StyledInput name="referredBy" disabled={editingKey !== recordId} /></StyledLabel> 
        <StyledError name="referredBy" component="div" />
        <StyledLabel>Shopping for how many
        <StyledInputNumber name="shoppingFor" disabled={editingKey !== recordId} /></StyledLabel> 
        <StyledError name="shoppingFor" component="div" />
        {editingKey === recordId && !approvalAction &&<StyledSubmitButton>Save</StyledSubmitButton>} 
        {approvalAction && <Button small data-action='approve' onClick={approvalAction}>Approve</Button>}  
        {approvalAction && <Button small data-action='reject' onClick={approvalAction}>Reject</Button>}
    </Form>
  );
};
