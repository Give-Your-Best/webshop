import * as React from 'react';
import { Form } from 'formik-antd';
import {
  StyledSubmitButton,
  StyledInput,
  StyledError,
  StyledLabel,
} from './EditForm.styles';
import { UserSelect, Space } from '../../atoms';

export const LocationMiniEditForm = ({ editingKey, recordId, users }) => {
  return (
    <Form>
      <StyledLabel>
        Name:
        <StyledInput name="name" disabled={editingKey !== recordId} />
        <StyledError name="name" component="div" />
      </StyledLabel>
      <StyledLabel>
        First line of address:
        <StyledInput name="firstLine" disabled={editingKey !== recordId} />
        <StyledError name="firstLine" component="div" />
      </StyledLabel>
      <StyledLabel>
        Second line of address:
        <StyledInput name="secondLine" disabled={editingKey !== recordId} />
        <StyledError name="secondLine" component="div" />
      </StyledLabel>
      <StyledLabel>
        Postcode:
        <StyledInput name="postcode" disabled={editingKey !== recordId} />
        <StyledError name="postcode" component="div" />
      </StyledLabel>
      <StyledLabel>
        Give your best member:
        <UserSelect
          users={users}
          selectName="adminUser._id"
          disabled={editingKey !== recordId}
        />
        <Space />
        <StyledError name="adminUser" component="div" />
      </StyledLabel>
      {editingKey === recordId && <StyledSubmitButton>Save</StyledSubmitButton>}
    </Form>
  );
};
