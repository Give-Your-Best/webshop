import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from '../../../../context/app-context';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, MessageReceived, MessageSent, MessagesContainer, StyledForm } from './AdminMessages.styles';
import { StyledInputAreaInLine, StyledSubmitButton, StyledError, InfoNote } from '../../../molecules/EditForm/EditForm.styles';
import { getMessages, sendMessage, markMessageAsViewed } from '../../../../services/messages';
import { sendAutoEmail, checkUnread, name } from '../../../../utils/helpers';
import { getUsers } from '../../../../services/user';
import { MessagesList, StartMessageThreadAdmin } from '../../../molecules';
import { Notification } from '../../../atoms';
import { Button } from '../../../atoms';
import { Formik } from 'formik';

export const AdminMessages = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [shoppersMessages, setShoppersMessages] = useState([]);
  const [donorsMessages, setDonorsMessages] = useState([]);
  const [newShopperThread, setNewShopperThread] = useState(false);
  const [newDonorThread, setNewDonorThread] = useState(false);
  const [donors, setDonors] = useState([]);
  const [shoppers, setShoppers] = useState([]);

  const handleSubmit = (type, values) => {
    if (type === 'donor') {
      setDonorsMessages(donorsMessages.concat(values));
    } else if (type === 'shopper') {
      setShoppersMessages(shoppersMessages.concat(values));
    }
  }

  const viewConversation = (conversation) => {

    const markAsRead = async () => {
      let unread = checkUnread('admin', '', conversation.messages);
      if (unread[0] > 0) {
        const res = await markMessageAsViewed(conversation._id, unread[1], token);
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
          if (conversation.type === 'shopper') {
            setShoppersMessages(shoppersMessages.map(msg => {
              if (msg._id === res.thread._id) {
                return res.thread;
              } else { 
                return msg
              }
            }));
          } else if (conversation.type === 'donor') {
            setDonorsMessages(donorsMessages.map(msg => {
              if (msg._id === res.thread._id) {
                return res.thread;
              } else { 
                return msg
              }
            }));
          }
          sendAutoEmail('new_message', conversation.user);
      } else {
          Notification('Error sending message', res.message, 'success')
      }
    };

    return (
      <div>
        <MessagesContainer>
        {conversation.messages.map((m)=>{
          if (!m.recipient || m.recipient.kind === 'admin') {
            return (<MessageSent key={m.threadId}><div><p>{m.message}</p><InfoNote>{name(m.sender) + ' ' + (new Date(m.sentDate)).toLocaleString()}</InfoNote></div></MessageSent>);
          } else {
            return (<MessageReceived key={m.threadId}><div><p>{m.message}</p><InfoNote>{'Admin ' + (new Date(m.sentDate)).toLocaleString()}</InfoNote></div></MessageReceived>);
          }
        })}
        </MessagesContainer>
        <Formik
          enableReinitialize={true}
          initialValues={{ subject: conversation.subject, message: '', recipient: conversation.user, sender: user.id, threadId: conversation.threadId }}
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

    const fetchMessagesShoppers = async () => {
      const messages = await getMessages('shopper', 'all', token);

      if (!mountedRef.current) return null;
      setShoppersMessages(messages);
    };

    const fetchMessagesDonors = async () => {
      const messages = await getMessages('donor', 'all', token);

      if (!mountedRef.current) return null;
      setDonorsMessages(messages);
    };

    const fetchShoppers = async () => {
      const users = await getUsers('shopper', 'approved', token);
      if (!mountedRef.current) return null;
        setShoppers(users);
    };

    const fetchDonors = async () => {
      const users = await getUsers('donor', 'approved', token);
      if (!mountedRef.current) return null;
        setDonors(users);
    };

    fetchShoppers();
    fetchDonors();

    fetchMessagesShoppers();
    fetchMessagesDonors();

    return () => {
      // cleanup
      mountedRef.current = false;
    };
  }, [token]);

  return (
    <StyledTabs forceRenderTabPanel={true}>
    <StyledTabList>
      <StyledTab>Shoppers</StyledTab>
      <StyledTab>Donors</StyledTab>
    </StyledTabList>

    <StyledTabPanel>
      <MessagesList data={shoppersMessages} expandRow={viewConversation} type='admin' />
      {!newShopperThread && <Button primary onClick={() => {setNewShopperThread(true)}}>Start a Thread</Button>}
      {newShopperThread && <StartMessageThreadAdmin users={shoppers} cancelFunction={setNewShopperThread} submitFunction={handleSubmit} type='shopper'></StartMessageThreadAdmin>}
    </StyledTabPanel>
    <StyledTabPanel>
      <MessagesList data={donorsMessages} expandRow={viewConversation} type='admin' />
      {!newDonorThread && <Button primary onClick={() => {setNewDonorThread(true)}}>Start a Thread</Button>}
      {newDonorThread && <StartMessageThreadAdmin users={donors} cancelFunction={setNewDonorThread} submitFunction={handleSubmit} type='donor'></StartMessageThreadAdmin>}
    </StyledTabPanel>

  </StyledTabs>
  );
};
