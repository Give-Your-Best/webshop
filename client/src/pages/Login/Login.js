import React, { useState, useContext } from 'react';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { loginSchema } from '../../utils/validation';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../context/app-context';
import { login } from '../../services/user';
import { StyledInput, StyledError, StyledSubmitButton, StyledLabel } from '../../components/molecules/EditForm/EditForm.styles';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab } from './Login.styles';
import { Container } from '../../components';
import { SignUpContainer } from '../../components/atoms';
import { DonorSignUpForm, ShopperSignUpForm } from '../../components/molecules';

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
    <Container data-id="LoginRoute">
      <StyledTabs forceRenderTabPanel={true} defaultIndex={1}>
        <StyledTabList>
          <StyledTab>Sign Up</StyledTab>
          <StyledTab>Login</StyledTab>
          <HiddenStyledTab className='adddonor'>Donor signup</HiddenStyledTab>
          <HiddenStyledTab className='addshopper'>Shopper signup</HiddenStyledTab>
        </StyledTabList>

        <StyledTabPanel>
          <SignUpContainer />
        </StyledTabPanel>
        <StyledTabPanel>
          <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema= { loginSchema }
          onSubmit={ handleLoginSubmit }
          >
            <Form>
              <div>
              <StyledLabel>Email address</StyledLabel>
              <StyledInput name="email" placeholder='Enter email address'/>
              <StyledError name="email" component="div" />

              <StyledLabel>Password</StyledLabel>
              <StyledInput.Password name="password" placeholder='Enter password' />
              <StyledError name="password" component="div" />
              </div>

              <StyledSubmitButton>Login</StyledSubmitButton>
            </Form>
        </Formik>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </StyledTabPanel>
        <StyledTabPanel>
          <DonorSignUpForm />
        </StyledTabPanel>
        <StyledTabPanel>
          <ShopperSignUpForm />
        </StyledTabPanel>
      </StyledTabs>

    </Container>
  );
};
