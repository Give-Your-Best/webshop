import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signupSchema } from '../../utils/validation';
import { TextInput } from '../../components/atoms/TextInput';
import { registerUser } from '../../services/user';

export const Register = () => {
    let history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegisterSubmit = async (values) => {
        const res = await registerUser(values);
        if (res.success) {
            history.push('/');
        } else {
            setErrorMessage(res.message);
        }
    };

    return (
        <div>
            <h2>Sign up</h2>
            <Formik
                initialValues={{ username: '', password: '', email: '', passwordConfirm: '', role: '' }}
                validationSchema= {signupSchema}
                onSubmit={handleRegisterSubmit}
                >
                {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="username" as={TextInput} placeholder="Create a username" />
                    <ErrorMessage name="username" component="div" />

                    <Field type="text" name="email" as={TextInput} placeholder="Enter your email" />
                    <ErrorMessage name="email" component="div" />

                    <Field name="role" as="select" placeholder="Select a role" >
                        <option value=''>Select a role</option>
                        <option value='donor'>Donor</option>
                        <option value='shopper'>Shopper</option>
                    </Field>
                    <ErrorMessage name="role" component="div" />

                    <Field type="password" name="password" as={TextInput} placeholder="Create a password" />
                    <ErrorMessage name="password" component="div" />

                    <Field type="password" name="passwordConfirm" as={TextInput} placeholder="Retype password" />
                    <ErrorMessage name="passwordConfirm" component="div" />
                    <div>
                    <label>Can we email you? </label>
                    <Field type="checkbox" name="emailMe" />
                    <ErrorMessage name="emailMe" component="div" />
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                    Submit
                    </button>
                </Form>
                )}

            </Formik>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      );
}