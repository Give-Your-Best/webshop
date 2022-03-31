import * as React from 'react';
import { Form } from 'formik-antd';
import { ErrorMessage } from 'formik';
import { StyledSubmitButton, StyledInput, StyledCheckbox } from './EditForm.styles';
import { Button } from '../../atoms/Button';

export const DonorMiniEditForm = ({ editingKey, recordId, approvalAction }) => {
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
        <StyledCheckbox name="trustedDonor" disabled={editingKey !== recordId}>Mark as trusted donor</StyledCheckbox>
        <ErrorMessage name="trustedDonor" component="div" />
        {editingKey === recordId && !approvalAction &&<StyledSubmitButton>Save</StyledSubmitButton>} 
        {approvalAction && <Button small data-action='approve' onClick={approvalAction}>Approve</Button>}  
        {approvalAction && <Button small data-action='reject' onClick={approvalAction}>Reject</Button>}  
        {approvalAction && <Button small data-action='info' onClick={approvalAction}>More info</Button>}   
    </Form>
  );
};
