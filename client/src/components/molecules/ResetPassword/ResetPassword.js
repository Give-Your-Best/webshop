import * as React from 'react';
import { Formik, Form } from 'formik';
import { StyledSubmitButton, StyledInput, StyledError } from '../../molecules/EditForm/EditForm.styles';
import { ModalStyled } from './ResetPassword.styles';
import { Button } from '../../atoms/Button';
import { resetPassword } from '../../../utils/validation';

export const ResetPassword = ({ handleOk, visible, handleCancel, loading }) => {
  return (
    <ModalStyled
      visible={visible}
      title="Are you sure you wish to reset your password?"
      onOk={handleOk}
      className= "modalStyle"
      footer={[]}
      onCancel={handleCancel}
      cancelText='Cancel'
      confirmLoading={loading}
  >
  <Formik
        visible={visible}
        initialValues={{ email: ''}}
        onSubmit={handleOk}
        validationSchema={resetPassword}
        >
        <Form>
          <StyledInput name="email" placeholder="Enter you email address" />
          <StyledError name="email" component="div" />
          <Button left primary onClick={handleCancel} type='reset'>Cancel</Button>
          <StyledSubmitButton>Reset Password</StyledSubmitButton>
        </Form>
      </Formik>
  </ModalStyled>
  );
};
