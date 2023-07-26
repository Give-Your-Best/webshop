import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { newThread } from '../../../utils/validation';
import { sendMessage } from '../../../services/messages';
import { Button, Notification, UserSelect } from '../../atoms';
import { sendAutoEmail } from '../../../utils/helpers';
import {
  StyledSubmitButton,
  StyledInput,
  StyledError,
  StyledInputArea,
} from './EditForm.styles';

export const StartMessageThreadAdmin = ({
  submitFunction,
  users,
  cancelFunction,
  type,
}) => {
  //no users or type
  const { token, user } = useContext(AppContext);

  const handleSubmit = async (values, { resetForm }) => {
    const d = new Date();
    let date = d.toISOString();

    const recipient = users.filter((u) => {
      return u._id === values.recipient;
    })[0];

    const newMessage = {
      type: type,
      subject: values.subject,
      user: recipient._id,
      messages: [
        {
          sender: values.sender,
          recipient: values.recipient,
          message: values.message,
          viewed: false,
          sentDate: date,
        },
      ],
    };
    const res = await sendMessage(newMessage, token);
    if (res.success) {
      Notification('Success!', 'Message sent', 'success');
      resetForm();
      cancelFunction();
      submitFunction(type, res.thread);
      sendAutoEmail('new_message', {
        email: res.thread.userEmail,
        fullName: res.thread.userFullName,
      });
    } else {
      Notification('Error sending message', res.message, 'success');
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          subject: '',
          message: '',
          recipient: '',
          sender: user.id,
        }}
        validationSchema={newThread}
        onSubmit={handleSubmit}
      >
        <Form>
          {users ? (
            <>
              <UserSelect
                users={users}
                selectName="recipient"
                fieldPlaceholder="Select a recipient"
                showSearch
              />
              <StyledError name="recipient" component="div" />
            </>
          ) : (
            ''
          )}

          <StyledInput name="subject" placeholder="Message subject" />
          <StyledError name="subject" component="div" />

          <StyledInputArea
            autosize="true"
            name="message"
            placeholder="Your message"
          />
          <StyledError name="message" component="div" />

          <StyledSubmitButton>Send</StyledSubmitButton>
          <Button
            primary
            type="reset"
            onClick={() => {
              cancelFunction(false);
            }}
          >
            Cancel
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
