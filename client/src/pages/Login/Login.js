import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import { loginSchema } from '../../utils/validation';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../context/app-context';
import { login, passwordReset } from '../../services/user';
import {
  StyledInput,
  StyledError,
  StyledSubmitButton,
  StyledLabel,
  StyledInputPassword,
  NewPasswordLink,
} from '../../components/molecules/EditForm/EditForm.styles';
import {
  StyledTab,
  StyledTabList,
  StyledTabs,
  StyledTabPanel,
  HiddenStyledTab,
  SignUpStyledTab,
  StyledForm,
} from './Login.styles';
import { Container } from '../../components';
import { SignUpContainer, Notification } from '../../components/atoms';
import {
  DonorSignUpForm,
  ShopperSignUpForm,
  ResetPassword,
} from '../../components/molecules';

export const Login = () => {
  const [, setCookie] = useCookies();
  const { setUser, setToken } = useContext(AppContext);
  let history = useHistory();
  const [errorMessage, setStyledError] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (values, { setSubmitting }) => {
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

  const handleReset = async (values) => {
    setLoading(true);
    const pwreset = await passwordReset(values.email);
    if (pwreset.success) {
      Notification(
        'Success!',
        'Your password has been reset. Please check your email.',
        'success'
      );
    } else {
      Notification(
        'Error!',
        'Error resetting password. Please check your email address.',
        'error'
      );
    }
    setLoading(false);
    setVisible(false);
  };

  const handleCancelReset = () => {
    setVisible(false);
    setLoading(false);
  };

  return (
    <Container data-id="LoginRoute">
      {true && (
        <>
          <ResetPassword
            visible={visible}
            handleOk={handleReset}
            handleCancel={handleCancelReset}
            loading={loading}
          />
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleLoginSubmit}
          >
            <StyledForm>
              <div>
                <StyledLabel>Email address</StyledLabel>
                <StyledInput name="email" placeholder="Enter email address" />
                <StyledError name="email" component="div" />

                <StyledLabel>Password</StyledLabel>
                <StyledInputPassword
                  name="password"
                  placeholder="Enter password"
                />
                <StyledError name="password" component="div" />
                <NewPasswordLink
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  Request a new password
                </NewPasswordLink>
              </div>

              <StyledSubmitButton>Log In</StyledSubmitButton>
            </StyledForm>
          </Formik>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
      )}

      {false && (
        <StyledTabs forceRenderTabPanel={true} defaultIndex={1}>
          <StyledTabList>
            <SignUpStyledTab>Sign Up</SignUpStyledTab>
            <StyledTab>Log In</StyledTab>
            <HiddenStyledTab className="adddonor">Donor signup</HiddenStyledTab>
            <HiddenStyledTab className="addshopper">
              Shopper signup
            </HiddenStyledTab>
          </StyledTabList>

          <StyledTabPanel>
            <SignUpContainer />
          </StyledTabPanel>
          <StyledTabPanel>
            <ResetPassword
              visible={visible}
              handleOk={handleReset}
              handleCancel={handleCancelReset}
              loading={loading}
            />
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={handleLoginSubmit}
            >
              <StyledForm>
                <div>
                  <StyledLabel>Email address</StyledLabel>
                  <StyledInput name="email" placeholder="Enter email address" />
                  <StyledError name="email" component="div" />

                  <StyledLabel>Password</StyledLabel>
                  <StyledInputPassword
                    name="password"
                    placeholder="Enter password"
                  />
                  <StyledError name="password" component="div" />
                  <NewPasswordLink
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    Request a new password
                  </NewPasswordLink>
                </div>

                <StyledSubmitButton>Log In</StyledSubmitButton>
              </StyledForm>
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
      )}
    </Container>
  );
};
