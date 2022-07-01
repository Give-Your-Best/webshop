import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { donorCreateSchema } from '../../../utils/validation';
import { createUser } from '../../../services/user';
import { Button, Notification } from '../../atoms';
import { reopenTab } from '../../../utils/helpers';
import { StyledSubmitButton, StyledInput, StyledCheckbox, StyledError, FieldContainerHalf, StyledLabel } from './EditForm.styles';
import { sendAutoEmail } from '../../../utils/helpers';

export const DonorCreateForm = (data) => {
    const { token } = useContext(AppContext);

    const handleSubmit = async (values, {resetForm}) => {
        const res = await createUser(values, token);
        if (res.success) {
            sendAutoEmail('new_user', values);
            Notification('Success!', 'New donor created', 'success');
            resetForm();
            reopenTab('donor');
            data.submitFunction(res.user, 'donor');
        } else {
            Notification('Error creating donor', res.message, 'success')
        }
    };

    const temp = Math.random().toString(36).slice(2, 12);

    return (
        <div>
            <Formik
                initialValues={{ firstName: '', lastName: '', password: temp, email: '', type: 'donor', approvedStatus: 'approved' }}
                validationSchema= {donorCreateSchema}
                onSubmit={handleSubmit}
                >
                <Form>
                <FieldContainerHalf>
                    <StyledLabel>First name
                    <StyledInput name="firstName" />
                    <StyledError name="firstName" component="div" /></StyledLabel>

                    <StyledLabel>Last name
                    <StyledInput name="lastName" />
                    <StyledError name="lastName" component="div" /></StyledLabel>
                </FieldContainerHalf>

                    <StyledLabel>Email
                    <StyledInput name="email" />
                    <StyledError name="email" component="div" /></StyledLabel>

                    <div>
                    <StyledCheckbox name="trustedDonor">Mark as trusted donor</StyledCheckbox>
                    <StyledError name="trustedDonor" component="div" /></div>
                    <StyledSubmitButton>Create</StyledSubmitButton>
                    <Button primary type="reset" onClick={() => {reopenTab('donor')}}>Cancel</Button>
                </Form>
            </Formik>
        </div>
      );
}