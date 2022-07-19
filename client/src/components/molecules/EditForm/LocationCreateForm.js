import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { locationCreateSchema } from '../../../utils/validation';
import { reopenTab } from '../../../utils/helpers';
import { createLocation } from '../../../services/locations';
import { Button, Notification, Space } from '../../atoms';
import { UserSelect } from '../../atoms/UserSelect';
import { StyledSubmitButton, StyledInput, StyledError, StyledLabel } from './EditForm.styles';

export const LocationCreateForm = (data) => {
    const { token } = useContext(AppContext);

    const handleSubmit = async (values, {resetForm}) => {
        const res = await createLocation(values, token);
        if (res.success) {
            Notification('Success!', 'New location created', 'success');
            resetForm();
            reopenTab('location');
            data.submitFunction(res.location);
        } else {
            Notification('Error creating location', res.message, 'success')
        }
    };

    return (
        <div>
            <Formik
                initialValues={{ name: '', firstLine: '', secondLine: '', postcode: '', available: true }}
                validationSchema= {locationCreateSchema}
                onSubmit={handleSubmit}
                >
                <Form>
                    <StyledInput name="name" placeholder="Enter location name" />
                    <StyledError name="name" component="div" />

                    <StyledInput name="firstLine" placeholder="First line of address" />
                    <StyledError name="firstLine" component="div" />

                    <StyledInput name="secondLine" placeholder="Second line of address" />
                    <StyledError name="secondLine" component="div" />

                    <StyledInput name="postcode" placeholder="Postcode" />
                    <StyledError name="postcode" component="div" />

                    <StyledLabel>Give your best member:</StyledLabel>
                    <UserSelect users={data.users} selectName="adminUser"/>
                    <StyledError name="adminUser" component="div" />

                    <Space />

                    <StyledSubmitButton>Create</StyledSubmitButton>
                    <Button primary type="reset" onClick={() => {reopenTab('location')}}>Cancel</Button>
                </Form>
            </Formik>
        </div>
      );
}