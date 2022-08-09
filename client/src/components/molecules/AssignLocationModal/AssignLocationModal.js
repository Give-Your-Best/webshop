import * as React from 'react';
import { StyledSelect, Space } from '../../atoms';
import { Formik, Form } from 'formik';
import { StyledSubmitButton } from '../EditForm/EditForm.styles';
import { ModalStyled } from './AssignLocationModal.styles';

export const AssignLocationModal = ({ visible, handleOk, handleCancel, loading, locations }) => {
  return (
    <ModalStyled
        visible={visible}
        title="Please select a team members location from the menu below"
        onOk={handleOk}
        className= "modalStyle"
        onCancel={handleCancel}
        footer={[]}
        confirmLoading={loading}
    >
        <Formik
                initialValues={{ location: ''}}
                onSubmit={handleOk}
                >
                <Form>
                <StyledSelect name="location" placeholder="Select a location">
                    {locations.map((d)=>{
                        return (<StyledSelect.Option key={d._id} value={d._id}>{d.name + ', ' + d.firstLine + ', ' + d.postcode + ' (' + d.items + ' current items)'}</StyledSelect.Option>);
                        })}
                </StyledSelect>
                <Space />
                <StyledSubmitButton>Assign</StyledSubmitButton>
                </Form>
            </Formik>
    </ModalStyled>
  );
};
