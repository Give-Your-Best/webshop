import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'formik-antd';
import { StyledSelect } from '../../components/atoms';
import { Formik } from 'formik';
import { signupSchema } from '../../utils/validation';
import { register } from '../../services/user';
import { StyledSubmitButton, StyledInput, StyledError, StyledCheckbox } from '../../components/molecules/EditForm/EditForm.styles';

export const Register = () => {
    let history = useHistory();
    const [errorMessage, setStyledError] = useState('');

    const handleRegisterSubmit = async (values) => {
        const res = await register(values);
        if (res.success) {
            history.push('/');
        } else {
            setStyledError(res.message);
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
                    <StyledInput name="username" placeholder="Create a username" />
                    <StyledError name="username" component="div" />

                    <StyledInput name="email" placeholder="Enter your email" />
                    <StyledError name="email" component="div" />

                    <StyledSelect name="type" placeholder="How would you like to participate">
                        <StyledSelect.Option value=''>Select an option</StyledSelect.Option>
                        <StyledSelect.Option value='donor'>Donor</StyledSelect.Option>
                        <StyledSelect.Option value='shopper'>Shopper</StyledSelect.Option>
                    </StyledSelect>
                    <StyledError name="type" component="div" />

                    <StyledInput.Password name="password" placeholder="Create a password" />
                    <StyledError name="password" component="div" />

                    <StyledInput.Password name="passwordConfirm" placeholder="Retype password" />
                    <StyledError name="passwordConfirm" component="div" />
                    <div>
                    <label>Can we email you? </label>
                    <StyledCheckbox name="emailMe" />
                    <StyledError name="emailMe" component="div" />
                    </div>
                    <StyledSubmitButton>Send request</StyledSubmitButton>
                </Form>
            </Formik>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      );
}