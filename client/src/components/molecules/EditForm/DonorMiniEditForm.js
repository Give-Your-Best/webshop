import * as React from 'react';
import { Form } from 'formik-antd';
import { ErrorMessage } from 'formik';
import { StyledSubmitButton, StyledInput, StyledCheckbox, StyledLabel } from './EditForm.styles';
import { Button } from '../../atoms/Button';

export const DonorMiniEditForm = ({ editingKey, recordId, approvalAction }) => {
  return (
    <Form>
        <StyledLabel>Name
        <StyledInput name="name" disabled={editingKey !== recordId} /></StyledLabel>
        <ErrorMessage name="name" component="div" />
        <StyledLabel>Email
        <StyledInput name="email" disabled={editingKey !== recordId} /></StyledLabel>
        <ErrorMessage name="email" component="div" />
        <StyledCheckbox name="trustedDonor" disabled={editingKey !== recordId}>Mark as trusted donor</StyledCheckbox>
        <ErrorMessage name="trustedDonor" component="div" />
        {editingKey === recordId && !approvalAction &&<StyledSubmitButton>Save</StyledSubmitButton>} 
        {approvalAction && <Button small data-action='approve' onClick={approvalAction}>Approve</Button>}  
        {approvalAction && <Button small data-action='reject' onClick={approvalAction}>Reject</Button>}  
    </Form>
  );
};
