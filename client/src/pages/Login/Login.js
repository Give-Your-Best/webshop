import React, { useState, useContext } from 'react';
import { Form, Input, SubmitButton } from 'formik-antd';
import { Formik, ErrorMessage } from 'formik';
import { loginSchema } from '../../utils/validation';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../context/app-context';
import { login } from '../../services/user';

export const Login = () => {
  const [, setCookie] = useCookies();
  const { setUser, setToken } = useContext(AppContext);
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = async (values, {setSubmitting}) => {
    setSubmitting(true);
    const res = await login(values);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      setCookie('jwt_user', res.token, { path: '/' });
      setSubmitting(false);
      history.push('/');
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div data-id="LoginRoute">
      <h2>Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema= {loginSchema}
        onSubmit={handleLoginSubmit}
        >
          <Form>
            <Input name="username" placeholder='Enter username'/>
            <ErrorMessage name="username" component="div" />
            <Input.Password name="password" placeholder='Enter password' />
            <ErrorMessage name="password" component="div" />
            <SubmitButton>Login</SubmitButton>
          </Form>
      </Formik>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};
