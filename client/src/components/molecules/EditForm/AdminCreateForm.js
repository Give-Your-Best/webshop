import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik, ErrorMessage } from 'formik';
import { adminSchema } from '../../../utils/validation';
import { createUser } from '../../../services/user';
import { Button, Notification, StyledSelect } from '../../atoms';
import { reopenTab } from '../../../utils/helpers';
import { StyledSubmitButton, StyledInput } from './EditForm.styles';

export const AdminCreateForm = (data) => {
    const { token } = useContext(AppContext);

    const handleSubmit = async (values, {resetForm}) => {
        const res = await createUser(values, token);
        if (res.success) {
            Notification('Success!', 'New team member created', 'success');
            resetForm();
            reopenTab('team');
            data.submitFunction(res.user);
        } else {
            Notification('Error creating team member', res.message, 'error')
        }
    };

    const temp = Math.random().toString(36).slice(2, 10);

    return (
        <div>
            <Formik
                initialValues={{ firstName: '', lastName: '', password: temp, email: '', type: 'admin', approvedStatus: 'approved' }}
                onSubmit={handleSubmit}
                validationSchema={adminSchema}
                >
                <Form>
                    <StyledInput name="firstName" placeholder="Enter first name" />
                    <ErrorMessage name="firstName" component="div" />

                    <StyledInput name="lastName" placeholder="Enter last name" />
                    <ErrorMessage name="lastName" component="div" />

                    <StyledInput name="email" placeholder="Enter email address" />
                    <ErrorMessage name="email" component="div" />

                    <StyledInput name="role" placeholder="Enter role" />
                    <ErrorMessage name="role" component="div" />

                    <StyledSelect name="assignedRole" placeholder="Assigned role">
                    {data.roles.map((d)=>{
                        return (<StyledSelect.Option key={d._id} value={d._id}>{d.name}</StyledSelect.Option>);
                        })}
                    </StyledSelect>
                    <StyledSubmitButton>Create</StyledSubmitButton>
                    <Button type="reset" onClick={() => {reopenTab('team')}}>Cancel</Button>
                </Form>
            </Formik>
        </div>
      );
}