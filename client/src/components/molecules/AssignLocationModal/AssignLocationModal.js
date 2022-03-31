import * as React from 'react';
import { Modal } from 'antd';
import { StyledSelect } from '../../atoms/Select/Select';
import { Formik, Form } from 'formik';
import { SubmitButton } from 'formik-antd';

export const AssignLocationModal = ({ visible, handleOk, handleCancel, loading, locations }) => {
  return (
    <Modal
        visible={visible}
        title="Please select a team members location from the menu below"
        onOk={handleOk}
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
                        return (<StyledSelect.Option key={d._id} value={d._id}>{d.name + ', ' + d.addresses[0].firstLine + ', ' + d.addresses[0].postcode}</StyledSelect.Option>);
                        })}
                </StyledSelect>
                <SubmitButton>Assign</SubmitButton>
                </Form>
            </Formik>
    </Modal>
  );
};
