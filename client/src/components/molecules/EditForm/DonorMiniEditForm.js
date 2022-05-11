import * as React from 'react';
import { Form } from 'formik-antd';
import { StyledSubmitButton, StyledInput, StyledCheckbox, StyledLabel, StyledError } from './EditForm.styles';
import { Button } from '../../atoms/Button';

export const DonorMiniEditForm = ({ editingKey, recordId, approvalAction }) => {
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
        <StyledCheckbox name="trustedDonor" disabled={editingKey !== recordId}>Mark as trusted donor</StyledCheckbox>
        <StyledError name="trustedDonor" component="div" />
        {editingKey === recordId && !approvalAction &&<StyledSubmitButton>Save</StyledSubmitButton>} 
        {approvalAction && <Button small data-action='approve' onClick={approvalAction}>Approve</Button>}  
        {approvalAction && <Button small data-action='reject' onClick={approvalAction}>Reject</Button>}  
    </Form>
  );
};
