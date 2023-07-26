import React, { useContext } from 'react';
import { Form } from 'formik-antd';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../../context/app-context';
import { Formik } from 'formik';
import { donorCreateSchema, passwordSchema } from '../../../utils/validation';
import { sendAutoEmail } from '../../../utils/helpers';
import { register, login } from '../../../services/user';
import { Notification } from '../../atoms';
import { StyledSubmitButton, SubHead } from './EditForm.styles';
import { UserEditForm } from './UserEditForm';

export const DonorSignUpForm = () => {
  const [, setCookie] = useCookies();
  const { setUser, setToken } = useContext(AppContext);
  let history = useHistory();

  const handleLoginSubmit = async (values) => {
    const res = await login(values);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      setCookie('jwt_user', res.token, { path: '/' });
    } else {
      console.log(res.message);
    }
  };

  const handleSubmit = async (values) => {
    values.email = values.email.toLowerCase();
    const res = await register(values);
    if (res.success) {
      Notification(
        'Success!',
        'Signed Up! Visit your account page to add items!',
        'success'
      );
      handleLoginSubmit({ email: values.email, password: values.password });
      sendAutoEmail('sign_up_donor', values);
      sendAutoEmail('new_signup');
      history.push('/');
    } else {
      Notification('Error signing up', res.message, 'success');
    }
  };

  return (
    <div>
      <SubHead>Donor Sign Up</SubHead>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          password: '',
          email: '',
          type: 'donor',
          approvedStatus: 'approved',
        }}
        validationSchema={donorCreateSchema.concat(passwordSchema)}
        onSubmit={handleSubmit}
      >
        <Form>
          <UserEditForm type="donor" signUp="donor" />

          <StyledSubmitButton>Sign Up</StyledSubmitButton>
        </Form>
      </Formik>
    </div>
  );
};
