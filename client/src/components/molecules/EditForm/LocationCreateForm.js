import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik, ErrorMessage } from 'formik';
import { locationCreateSchema } from '../../../utils/validation';
import { reopenTab } from '../../../utils/helpers';
import { createLocation } from '../../../services/locations';
import { Button, Notification } from '../../atoms';
import { UserSelect } from '../../atoms/UserSelect';
import { StyledSubmitButton, StyledInput } from './EditForm.styles';

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
                initialValues={{ name: '', firstLine: '', secondLine: '', postcode: '' }}
                validationSchema= {locationCreateSchema}
                onSubmit={handleSubmit}
                >
                <Form>
                    <StyledInput name="name" placeholder="Enter location name" />
                    <ErrorMessage name="name" component="div" />

                    <StyledInput name="firstLine" placeholder="First line of address" />
                    <ErrorMessage name="firstLine" component="div" />

                    <StyledInput name="secondLine" placeholder="Second line of address" />
                    <ErrorMessage name="secondLine" component="div" />

                    <StyledInput name="postcode" placeholder="Postcode" />
                    <ErrorMessage name="postcode" component="div" />

                    <label>Give your best member:</label>
                    <UserSelect users={data.users} selectName="adminUser"/>
                    <ErrorMessage name="adminUser" component="div" />

                    <StyledSubmitButton>Create</StyledSubmitButton>
                    <Button type="reset" onClick={() => {reopenTab('location')}}>Cancel</Button>
                </Form>
            </Formik>
        </div>
      );
}