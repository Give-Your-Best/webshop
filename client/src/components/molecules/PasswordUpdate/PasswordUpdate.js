import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { updatePasswordSchema } from '../../../utils/validation';
import { updatePassword } from '../../../services/user';
import { Button, Notification, H2 } from '../../atoms';
import { reopenTab } from '../../../utils/helpers';
import { StyledSubmitButton, StyledInput, StyledError } from '../EditForm/EditForm.styles';

export const PasswordUpdate = (data) => {
    const { token } = useContext(AppContext);

    const handleSubmit = async (values, {resetForm}) => {
        const res = await updatePassword(values, token);
        if (res.success) {
            Notification('Success!', 'Password updated', 'success');
            resetForm();
            reopenTab('detail');
        } else {
            Notification('Error updating password', res.message, 'error')
        }
    };

    return (
        <div>
            <H2>Update password</H2>
            <Formik
                initialValues={{ id: data.id, email: data.email, oldPassword: '', newPassword: '', passwordConfirm: ''}}
                validationSchema={updatePasswordSchema}
                onSubmit={handleSubmit}
                >
                <Form>
                    <StyledInput type="password" name="oldPassword" placeholder="Enter your old password" />
                    <StyledError name="oldPassword" component="div" />

                    <StyledInput type="password" name="newPassword" placeholder="Enter your new password" />
                    <StyledError name="newPassword" component="div" />

                    <StyledInput type="password" name="passwordConfirm" placeholder="Confirm your new password" />
                    <StyledError name="passwordConfirm" component="div" />

                    <StyledSubmitButton>Update</StyledSubmitButton>
                    <Button primary type="reset" onClick={() => {reopenTab('detail')}}>Cancel</Button>
                </Form>
            </Formik>
        </div>
      );
}