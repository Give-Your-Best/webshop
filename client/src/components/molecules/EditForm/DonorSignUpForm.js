import React from 'react';
import { Form } from 'formik-antd';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { donorCreateSchema, passwordSchema } from '../../../utils/validation';
import { sendAutoEmail } from '../../../utils/helpers';
import { register } from '../../../services/user';
import { Notification } from '../../atoms';
import { StyledSubmitButton, SubHead } from './EditForm.styles';
import { UserEditForm } from './UserEditForm';

export const DonorSignUpForm = () => {
    let history = useHistory();

    const handleSubmit = async (values) => {
        const res = await register(values);
        if (res.success) {
            Notification('Success!', 'Signed Up! You will hear from us soon', 'success');
            sendAutoEmail('sign_up', values);
            sendAutoEmail('new_signup');
            history.push('/');
        } else {
            Notification('Error signing up', res.message, 'success')
        }
    };

    return (
        <div>
            <SubHead>Donor Sign Up</SubHead>
            <Formik
                initialValues={{ firstName: '', lastName: '', password: '', email: '', type: 'donor' }}
                validationSchema= {donorCreateSchema.concat(passwordSchema)}
                onSubmit={handleSubmit}
                >
                <Form>
                    <UserEditForm type='donor' signUp='donor' />

                    <StyledSubmitButton>Sign Up</StyledSubmitButton>
                </Form>
            </Formik>
        </div>
      );
}