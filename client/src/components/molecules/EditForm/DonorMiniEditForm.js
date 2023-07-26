import * as React from 'react';
import { Form } from 'formik-antd';
import {
  StyledSubmitButton,
  StyledInput,
  StyledCheckbox,
  StyledLabel,
  StyledError,
  FieldContainerHalf,
} from './EditForm.styles';
import { Button } from '../../atoms/Button';

export const DonorMiniEditForm = ({ editingKey, recordId, approvalAction }) => {
  return (
    <Form>
      <FieldContainerHalf>
        <StyledLabel>
          First name
          <StyledInput name="firstName" disabled={editingKey !== recordId} />
          <StyledError name="firstName" component="div" />
        </StyledLabel>

        <StyledLabel>
          Last name
          <StyledInput name="lastName" disabled={editingKey !== recordId} />
          <StyledError name="lastName" component="div" />
        </StyledLabel>
      </FieldContainerHalf>

      <StyledLabel>
        Email
        <StyledInput name="email" disabled={editingKey !== recordId} />
        <StyledError name="email" component="div" />
      </StyledLabel>

      <div>
        <StyledCheckbox name="trustedDonor" disabled={editingKey !== recordId}>
          Mark as trusted donor
        </StyledCheckbox>
        <StyledError name="trustedDonor" component="div" />
      </div>

      {editingKey === recordId && !approvalAction && (
        <StyledSubmitButton>Save</StyledSubmitButton>
      )}
      {approvalAction && (
        <Button primary small data-action="approve" onClick={approvalAction}>
          Approve
        </Button>
      )}
      {approvalAction && (
        <Button primary small data-action="reject" onClick={approvalAction}>
          Reject
        </Button>
      )}
    </Form>
  );
};
