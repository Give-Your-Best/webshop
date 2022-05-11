import * as React from 'react';
import { Form } from 'formik-antd';
import { StyledSubmitButton, StyledInput, StyledError } from './EditForm.styles';
import { StyledSelect } from '../../atoms';

//admin user needs to be a dropdown listing all admin users

export const AdminMiniEditForm = ({ editingKey, recordId, roles }) => {
  return (
    <Form>
        <StyledInput name="firstName" disabled={editingKey !== recordId} placeholder="Enter first name" />
        <StyledError name="firstName" component="div" />

        <StyledInput name="lastName" disabled={editingKey !== recordId} placeholder="Enter last name" />
        <StyledError name="lastName" component="div" />

        <StyledInput name="email" disabled={editingKey !== recordId} placeholder="Enter email address" />
        <StyledError name="email" component="div" />

        <StyledInput name="role" disabled={editingKey !== recordId} placeholder="Enter role" />
        <StyledError name="role" component="div" />

        <StyledSelect name="assignedRole" disabled={editingKey !== recordId} placeholder="Assigned role">
          {roles.map((d)=>{
              return (<StyledSelect.Option key={d._id} value={d._id}>{d.name}</StyledSelect.Option>);
              })}
        </StyledSelect>
        {editingKey === recordId &&<StyledSubmitButton>Save</StyledSubmitButton>} 
    </Form>
  );
};
