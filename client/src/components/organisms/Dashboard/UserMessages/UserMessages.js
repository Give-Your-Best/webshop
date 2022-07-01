import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from '../../../../context/app-context';
import { MessageReceived, MessageSent, MessagesContainer, StyledForm } from './UserMessages.styles';
import { StyledSubmitButton, StyledError, InfoNote, StyledInputAreaInLine } from '../../../molecules/EditForm/EditForm.styles';
import { getMessages, sendMessage, markMessageAsViewed } from '../../../../services/messages';
import { getGYBDummyUser } from '../../../../services/user';
import { MessagesList, StartMessageThreadUser } from '../../../molecules';
import { Notification, H2 } from '../../../atoms';
import { Button } from '../../../atoms';
import { Formik } from 'formik';
import { checkUnread, name } from '../../../../utils/helpers';

export const UserMessages = () => {
  const { token, user } = useContext(AppContext);
  const type = user.type;
  const mountedRef = useRef(true);
  const [messages, setMessages] = useState([]);
  const [newThread, setNewThread] = useState(false);
  const [emailId, setEmailId] = useState('');

  const handleSubmit = (values) => {
    setMessages(messages.concat(values));
  }

  const viewConversation = (conversation) => {
    const markAsRead = async () => {
      let unread = checkUnread(type, user.id, conversation.messages);
      if (unread[0] > 0) {
        const res = await markMessageAsViewed(conversation._id, unread[1], token);
        console.log(res);
      }
    }

    markAsRead();

    const handleSubmit = async (values, {resetForm}) => {
      const d = new Date();
      let date = d.toISOString();
      values.sentDate = date;

      const res = await sendMessage(values, token);
      if (res.success) {
          Notification('Success!', 'Message sent', 'success');
          resetForm();
          //add to conversdation
          setMessages(messages.map(msg => {
            if (msg._id === res.thread._id) {
              return res.thread;
            } else { 
              return msg
            }
          }));
        } else {
            Notification('Error sending message', res.message, 'success')
        }
    };

    return (
      <div>
        <MessagesContainer>
        {conversation.messages.map((m)=>{
          if (m.recipient.kind === 'admin') {
            return (<MessageReceived key={m.threadId}><div><p>{m.message}</p><InfoNote>{name(m.sender) + ' ' + (new Date(m.sentDate)).toLocaleString()}</InfoNote></div></MessageReceived>);
          } else {
            return (<MessageSent key={m.threadId}><div><p>{m.message}</p><InfoNote>{'Admin ' + (new Date(m.sentDate)).toLocaleString()}</InfoNote></div></MessageSent>);
          }
        })}
        </MessagesContainer>
        <Formik
          enableReinitialize={true}
          initialValues={{ subject: conversation.subject, message: '', recipient: emailId, sender: user.id, threadId: conversation.threadId }}
          onSubmit={handleSubmit}
          >
            <StyledForm>
            <StyledInputAreaInLine autosize="true" name="message" placeholder="Your message" />
            <StyledError name="message" component="div" />

            <StyledSubmitButton>{'Send >'}</StyledSubmitButton>
          </StyledForm>

        </Formik>
      </div>
    )
  }

    useEffect(() => {
      const fetchMessages = async () => {
        const messages = await getMessages('shopper', user.id, token);
        if (!mountedRef.current) return null;
        setMessages(messages);
      };

      const getEmailId = async () => {
        const settingId = await getGYBDummyUser('GYBAdminAccountForMessages', token);
        if (!mountedRef.current) return null;
        setEmailId(settingId);
      }

    fetchMessages();
    getEmailId();

    return () => {
      // cleanup
      mountedRef.current = false;
    };

  }, [token, user.id]);

  return (
    <>
    <H2>Messaging</H2>
    <MessagesList data={messages || []} userId={user.id} expandRow={viewConversation} />
      {!newThread && <Button primary onClick={() => {setNewThread(true)}}>Start a Thread</Button>}
      {newThread && <StartMessageThreadUser cancelFunction={setNewThread} submitFunction={handleSubmit} emailId={emailId}></StartMessageThreadUser>}
    </>
  );
};
