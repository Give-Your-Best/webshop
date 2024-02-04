import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../../../../context/app-context';
import { SocketContext } from '../../../../context/socket-context';
import {
  MessageReceived,
  MessageSent,
  MessagesContainer,
  StyledForm,
} from './UserMessages.styles';
import {
  StyledSubmitButton,
  StyledError,
  InfoNote,
  StyledInputAreaInLine,
} from '../../../molecules/EditForm/EditForm.styles';
import {
  getMessages,
  sendMessage,
  markMessageAsViewed,
} from '../../../../services/messages';
import { getGYBDummyUser } from '../../../../services/user';
import { MessagesList, StartMessageThreadUser } from '../../../molecules';
import { Notification, H2 } from '../../../atoms';
import { Button } from '../../../atoms';
import { Formik } from 'formik';
import { checkUnread, name, tabList } from '../../../../utils/helpers';

export const UserMessages = () => {
  const { token, user } = useContext(AppContext);
  const channel = useContext(SocketContext);
  const type = user.type;
  const mountedRef = useRef(true);
  const blahblahRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newThread, setNewThread] = useState(false);
  const [emailId, setEmailId] = useState('');

  const handleSubmit = (values) => {
    setMessages(messages.concat(values));
  };

  const viewConversation = (conversation) => {
    console.log({ conversation, messages });
    const markAsRead = async () => {
      let unread = checkUnread(type, user.id, conversation.messages);
      if (unread[0] > 0) {
        await markMessageAsViewed(conversation._id, unread[1], token);
      }
    };

    markAsRead();

    const handleSubmit = async (values, { resetForm }) => {
      const d = new Date();
      let date = d.toISOString();

      const { message, recipient, sender, threadId } = values;

      const newMessage = {
        threadId,
        messages: [
          {
            sender,
            recipient,
            message,
            sentDate: date,
            viewed: false,
          },
        ],
      };

      const res = await sendMessage(newMessage, token);
      if (res.success) {
        Notification('Success!', 'Message sent', 'success');
        resetForm();
        //add to conversdation
        setMessages(
          messages.map((msg) => {
            if (msg._id === res.thread._id) {
              return res.thread;
            } else {
              return msg;
            }
          })
        );
      } else {
        Notification('Error sending message', res.message, 'success');
      }
    };

    return (
      <div>
        <MessagesContainer ref={blahblahRef}>
          {conversation.messages.map((m) => {
            if (m.recipient.kind === 'admin') {
              return (
                <MessageReceived key={m._id}>
                  <div>
                    <p>{m.message}</p>
                    <InfoNote>
                      {name(m.sender) +
                        ' ' +
                        new Date(m.sentDate).toLocaleString()}
                    </InfoNote>
                  </div>
                </MessageReceived>
              );
            } else {
              return (
                <MessageSent key={m._id}>
                  <div>
                    <p>{m.message}</p>
                    <InfoNote>
                      {'Admin ' + new Date(m.sentDate).toLocaleString()}
                    </InfoNote>
                  </div>
                </MessageSent>
              );
            }
          })}
        </MessagesContainer>
        <Formik
          enableReinitialize={true}
          initialValues={{
            subject: conversation.subject,
            message: '',
            recipient: emailId,
            sender: user.id,
            threadId: conversation.threadId,
          }}
          onSubmit={handleSubmit}
        >
          <StyledForm>
            <StyledInputAreaInLine
              autosize="true"
              name="message"
              placeholder="Your message"
            />
            <StyledError name="message" component="div" />

            <StyledSubmitButton>{'Send >'}</StyledSubmitButton>
          </StyledForm>
        </Formik>
      </div>
    );
  };

  const onMessage = React.useCallback(
    (data) => {
      // const { data, event } = JSON.parse(message);

      console.log({ data });

      if (!mountedRef.current) return;

      (async () => {
        const messages = await getMessages('shopper', user.id, token);

        setMessages(messages);
        // blahblahRef.current.scrollTop = blahblahRef.current.scrollHeight;
        // blahblahRef.current.lastChild.scrollIntoView({
        //   behavior: 'smooth',
        //   block: 'end',
        // });
        blahblahRef.current.scroll({
          top: blahblahRef.current.scrollHeight,
          behavior: 'smooth',
        });
      })();
      // }
    },
    [token, user.id]
  );

  React.useEffect(() => {
    channel.bind('new-message', onMessage);
    return () => channel.unbind('new-message', onMessage);
  }, [channel, onMessage]);

  useEffect(() => {
    var tabs = tabList(user);
    tabs.forEach((t) => {
      if (t.name === 'Messaging') {
        window.history.pushState({}, '', '/dashboard/' + t.id);
      }
    });

    const fetchMessages = () => {
      getMessages('shopper', user.id, token).then(setMessages);
    };

    const getEmailId = () => {
      getGYBDummyUser('GYBAdminAccountForMessages', token).then(setEmailId);
    };

    if (mountedRef.current) {
      fetchMessages();
      getEmailId();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [token, user]);

  return (
    <>
      <H2>Messaging</H2>
      <MessagesList
        data={messages || []}
        userId={user.id}
        expandRow={viewConversation}
      />
      {!newThread && (
        <Button
          primary
          onClick={() => {
            setNewThread(true);
          }}
        >
          Start New Conversation
        </Button>
      )}
      {newThread && (
        <StartMessageThreadUser
          cancelFunction={setNewThread}
          submitFunction={handleSubmit}
          emailId={emailId}
        ></StartMessageThreadUser>
      )}
    </>
  );
};
