import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { shopperCreateSchema } from '../../../utils/validation';
import { register } from '../../../services/user';
import { Notification } from '../../atoms';
import { StyledSubmitButton } from './EditForm.styles';
import { UserEditForm } from './UserEditForm';

export const ShopperSignUpForm = () => {
    let history = useHistory();

    const handleSubmit = async (values) => {
        const res = await register(values);
        if (res.success) {
            Notification('Success!', 'Signed Up! You will hear from us soon', 'success');
            history.push('/');
        } else {
            Notification('Error signing up', res.message, 'success')
        }
    };

    return (
        <div>
            <h3>Shopper Sign Up</h3>
            <Formik
                initialValues={{ firstName: '', lastName: '', password: '', email: '', type: 'shopper' }}
                validationSchema= {shopperCreateSchema}
                onSubmit={handleSubmit}
                >
                <Form>
                    <UserEditForm type='shopper' signUp='shopper' />
                    <StyledSubmitButton>Sign Up</StyledSubmitButton>
                </Form>
            </Formik>
        </div>
    );
}