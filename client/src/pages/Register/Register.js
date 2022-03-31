import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, SubmitButton, Checkbox } from 'formik-antd';
import { StyledSelect } from '../../components/atoms/Select/Select';
import { Formik, ErrorMessage } from 'formik';
import { signupSchema } from '../../utils/validation';
import { register } from '../../services/user';

export const Register = () => {
    let history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegisterSubmit = async (values) => {
        const res = await register(values);
        if (res.success) {
            history.push('/');
        } else {
            setErrorMessage(res.message);
        }
    };

    return (
        <div>
            <h2>Request to join</h2>
            <Formik
                initialValues={{ username: '', password: '', email: '', passwordConfirm: '', type: '' }}
                validationSchema= {signupSchema}
                onSubmit={handleRegisterSubmit}
                >
                <Form>
                    <Input name="username" placeholder="Create a username" />
                    <ErrorMessage name="username" component="div" />

                    <Input name="email" placeholder="Enter your email" />
                    <ErrorMessage name="email" component="div" />

                    <StyledSelect name="type" placeholder="How would you like to participate">
                        <StyledSelect.Option value=''>Select an option</StyledSelect.Option>
                        <StyledSelect.Option value='donor'>Donor</StyledSelect.Option>
                        <StyledSelect.Option value='shopper'>Shopper</StyledSelect.Option>
                    </StyledSelect>
                    <ErrorMessage name="type" component="div" />

                    <Input.Password name="password" placeholder="Create a password" />
                    <ErrorMessage name="password" component="div" />

                    <Input.Password name="passwordConfirm" placeholder="Retype password" />
                    <ErrorMessage name="passwordConfirm" component="div" />
                    <div>
                    <label>Can we email you? </label>
                    <Checkbox name="emailMe" />
                    <ErrorMessage name="emailMe" component="div" />
                    </div>
                    <SubmitButton>Send request</SubmitButton>
                </Form>
            </Formik>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      );
}