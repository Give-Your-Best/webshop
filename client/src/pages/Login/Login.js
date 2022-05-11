import React, { useState, useContext } from 'react';
import { Form, SubmitButton } from 'formik-antd';
import { Formik } from 'formik';
import { loginSchema } from '../../utils/validation';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../context/app-context';
import { login } from '../../services/user';
import { StyledInput, StyledError } from '../../components/molecules/EditForm/EditForm.styles';

export const Login = () => {
  const [, setCookie] = useCookies();
  const { setUser, setToken } = useContext(AppContext);
  let history = useHistory();
  const [errorMessage, setStyledError] = useState('');

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
      setStyledError(res.message);
    }
  };

  return (
    <div data-id="LoginRoute">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema= {loginSchema}
        onSubmit={handleLoginSubmit}
        >
          <Form>
            <StyledInput name="email" placeholder='Enter email address'/>
            <StyledError name="email" component="div" />
            <StyledInput.Password name="password" placeholder='Enter password' />
            <StyledError name="password" component="div" />
            <SubmitButton>Login</SubmitButton>
          </Form>
      </Formik>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};
