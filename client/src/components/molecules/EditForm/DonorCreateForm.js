import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { donorCreateSchema } from '../../../utils/validation';
import { createUser } from '../../../services/user';
import { Button, Notification } from '../../atoms';
import { reopenTab } from '../../../utils/helpers';
import { StyledSubmitButton, StyledInput, StyledCheckbox, StyledError} from './EditForm.styles';

export const DonorCreateForm = (data) => {
    const { token } = useContext(AppContext);

    const handleSubmit = async (values, {resetForm}) => {
        const res = await createUser(values, token);
        if (res.success) {
            Notification('Success!', 'New donor created', 'success');
            resetForm();
            reopenTab('donor');
            data.submitFunction(res.user, 'donor');
        } else {
            Notification('Error creating donor', res.message, 'success')
        }
    };

    const temp = Math.random().toString(36).slice(2, 10);

    return (
        <div>
            <Formik
                initialValues={{ firstName: '', lastName: '', password: temp, email: '', type: 'donor', approvedStatus: 'approved' }}
                validationSchema= {donorCreateSchema}
                onSubmit={handleSubmit}
                >
                <Form>
                    <StyledInput name="firstName" placeholder="Enter first name" />
                    <StyledError name="firstName" component="div" />

                    <StyledInput name="lastName" placeholder="Enter last name" />
                    <StyledError name="lastName" component="div" />

                    <StyledInput name="email" placeholder="Enter your email" />
                    <StyledError name="email" component="div" />
                    <div>
                    <label>Mark as trusted donor? </label>
                    <StyledCheckbox name="trustedDonor" />
                    <StyledError name="trustedDonor" component="div" />
                    </div>
                    <StyledSubmitButton>Create</StyledSubmitButton>
                    <Button small type="reset" onClick={() => {reopenTab('donor')}}>Cancel</Button>
                </Form>
            </Formik>
        </div>
      );
}