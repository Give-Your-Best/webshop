import * as React from 'react';
import { Form } from 'formik-antd';
import { StyledSubmitButton, StyledInput, StyledInputNumber, StyledLabel, StyledError, FieldContainerHalf, StyledRadio, StyledSelect } from './EditForm.styles';
import { Button } from '../../atoms/Button';
import { currentStatus } from '../../../utils/constants';

//these are all strings, select fields need to be added

export const ShopperMiniEditForm = ({ editingKey, recordId, approvalAction }) => {
  return (
    <Form>
        <FieldContainerHalf>
        <StyledLabel>First name
        <StyledInput name="firstName" disabled={editingKey !== recordId} />
        <StyledError name="firstName" component="div" /></StyledLabel>
        <StyledLabel>Last Name
        <StyledInput name="lastName" disabled={editingKey !== recordId} />
        <StyledError name="lastName" component="div" /></StyledLabel>
        </FieldContainerHalf>
        <FieldContainerHalf>
        <StyledLabel>Email
        <StyledInput name="email" disabled={editingKey !== recordId} />
        <StyledError name="email" component="div" /></StyledLabel>
        <StyledLabel>Delivery preference
        <div>
          <StyledRadio.Group name="deliveryPreference" disabled={editingKey !== recordId}>
          <StyledRadio value={"direct"}>yes</StyledRadio>
          <StyledRadio value={"via-gyb"}>no</StyledRadio>
          </StyledRadio.Group>
        </div>
        <StyledError name="deliveryPreference" component="div" /></StyledLabel>
        </FieldContainerHalf>

        <FieldContainerHalf>
          <StyledLabel>Address Line 1
          <StyledInput name="deliveryAddress.firstLine" disabled={editingKey !== recordId} />
          <StyledError name="deliveryAddress.firstLine" component="div" /></StyledLabel>
          <StyledLabel>Address Line 2
          <StyledInput name="deliveryAddress.secondLine" disabled={editingKey !== recordId} />
          <StyledError name="deliveryAddress.secondLine" component="div" /></StyledLabel>
          </FieldContainerHalf>
          <FieldContainerHalf>
          <StyledLabel>City
          <StyledInput name="deliveryAddress.city" disabled={editingKey !== recordId} />
          <StyledError name="deliveryAddress.city" component="div" /></StyledLabel>
          <StyledLabel>Post Code
          <StyledInput name="deliveryAddress.postcode" disabled={editingKey !== recordId} />
          <StyledError name="deliveryAddress.postcode" component="div" /></StyledLabel>
        </FieldContainerHalf>

        <FieldContainerHalf>
        <StyledLabel>Current Status
        <StyledSelect name="currentStatus" disabled={editingKey !== recordId} >
        {currentStatus.map((d)=>{
            return (<StyledSelect.Option key={d} value={d}>{d}</StyledSelect.Option>);
            })}
        </StyledSelect>
        <StyledError name="currentStatus" component="div" /></StyledLabel>

        <StyledLabel>Referred by
        <StyledInput name="referredBy" disabled={editingKey !== recordId} />
        <StyledError name="referredBy" component="div" /></StyledLabel>
        </FieldContainerHalf>
        <StyledLabel>Shopping for how many
        <StyledInputNumber name="shoppingFor" disabled={editingKey !== recordId} />
        <StyledError name="shoppingFor" component="div" /></StyledLabel>

        {editingKey === recordId && !approvalAction &&<StyledSubmitButton>Save</StyledSubmitButton>} 
        {approvalAction && <Button primary small data-action='approve' onClick={approvalAction}>Approve</Button>}  
        {approvalAction && <Button primary small data-action='reject' onClick={approvalAction}>Reject</Button>}
    </Form>
  );
};
