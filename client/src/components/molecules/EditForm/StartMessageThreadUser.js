import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { newThreadUser } from '../../../utils/validation';
import { sendMessage } from '../../../services/messages';
import { Button, Notification } from '../../atoms';
import { StyledSubmitButton, StyledInput, StyledError, StyledInputArea } from './EditForm.styles';

export const StartMessageThreadUser = ({submitFunction, cancelFunction, emailId}) => {
    //recipient can be passed in by leaving the users param empty and sending the email Id
    const { token, user } = useContext(AppContext);

    const handleSubmit = async (values, {resetForm}) => {
        const d = new Date();
        let date = d.toISOString();
        var newMessage = {
                type: user.type,
                subject: values.subject,
                user: user.id,
                messages: [
                    {
                        sender: user.id,
                        recipient: emailId,
                        message: values.message,
                        viewed: false,
                        sentDate: date
                    }
                ]
            }
        const res = await sendMessage(newMessage, token);
        if (res.success) {
            Notification('Success!', 'Message sent', 'success');
            resetForm();
            cancelFunction()
            submitFunction(res.thread);
        } else {
            Notification('Error sending message', res.message, 'success')
        }
    };

    return (
        <div>
            <Formik
                initialValues={{ subject: '', message: '', recipient: '', sender: user.id }}
                validationSchema= {newThreadUser}
                onSubmit={handleSubmit}
                >
                <Form>
                    <StyledInput name="subject" placeholder="Message subject" />
                    <StyledError name="subject" component="div" />

                    <StyledInputArea autosize="true" name="message" placeholder="Your message" />
                    <StyledError name="message" component="div" />

                    <StyledSubmitButton>Send</StyledSubmitButton>
                    <Button primary small type="reset" onClick={() => {cancelFunction(false)}}>Cancel</Button>
                </Form>
            </Formik>
        </div>
      );
}