import React, { useContext, useState, useEffect } from 'react';
import { Select } from 'antd';
import { AppContext } from '../../../../context/app-context';
import { AccountContext } from '../../../../context/account-context';
import {
  StyledTab,
  StyledTabList,
  StyledTabs,
  StyledTabPanel,
  MessageReceived,
  MessageSent,
  MessagesContainer,
  StyledForm,
} from './AdminMessages.styles';
import {
  StyledInputAreaInLine,
  StyledSubmitButton,
  StyledError,
  InfoNote,
} from '../../../molecules/EditForm/EditForm.styles';
import {
  getMessages,
  sendMessage,
  markMessageAsViewed,
} from '../../../../services/messages';
import {
  sendAutoEmail,
  checkUnread,
  name,
  tabList,
} from '../../../../utils/helpers';
import { MessagesList, StartMessageThreadAdmin } from '../../../molecules';
import { Notification } from '../../../atoms';
import { Button } from '../../../atoms';
import { Formik } from 'formik';

export const AdminMessages = () => {
  const { token, user } = useContext(AppContext);
  const { allUsers } = useContext(AccountContext);
  const [currentView, setCurrentView] = useState('active');
  const [shoppersMessages, setShoppersMessages] = useState([]);
  const [donorsMessages, setDonorsMessages] = useState([]);
  const [newShopperThread, setNewShopperThread] = useState(false);
  const [newDonorThread, setNewDonorThread] = useState(false);
  const [donors, setDonors] = useState([]);
  const [shoppers, setShoppers] = useState([]);

  const handleSelectView = (view) => {
    setCurrentView(view);
  };

  const handleSubmit = (type, values) => {
    if (type === 'donor') {
      setDonorsMessages(donorsMessages.concat(values));
    } else if (type === 'shopper') {
      setShoppersMessages(shoppersMessages.concat(values));
    }
  };

  const viewConversation = (conversation) => {
    const markAsRead = async () => {
      let unread = checkUnread('admin', '', conversation.messages);
      if (unread[0] > 0) {
        await markMessageAsViewed(conversation._id, unread[1], token);
      }
    };

    markAsRead();

    const handleSubmit = async (values, { resetForm }) => {
      const d = new Date();
      let date = d.toISOString();
      values.sentDate = date;

      const res = await sendMessage(values, token);

      if (res.success) {
        Notification('Success!', 'Message sent', 'success');
        resetForm();
        //add to conversdation
        if (conversation.type === 'shopper') {
          setShoppersMessages(
            shoppersMessages.map((msg) => {
              if (msg._id === res.thread._id) {
                return res.thread;
              } else {
                return msg;
              }
            })
          );
        } else if (conversation.type === 'donor') {
          setDonorsMessages(
            donorsMessages.map((msg) => {
              if (msg._id === res.thread._id) {
                return res.thread;
              } else {
                return msg;
              }
            })
          );
        }
        sendAutoEmail('new_message', conversation.user);
      } else {
        Notification('Error sending message', res.message, 'success');
      }
    };

    return (
      <div>
        <MessagesContainer>
          {conversation.messages.map((m) => {
            if (!m.recipient || m.recipient.kind === 'admin') {
              return (
                <MessageSent key={m.threadId}>
                  <div>
                    <p>{m.message}</p>
                    <InfoNote>
                      {name(m.sender) +
                        ' ' +
                        new Date(m.sentDate).toLocaleString()}
                    </InfoNote>
                  </div>
                </MessageSent>
              );
            } else {
              return (
                <MessageReceived key={m.threadId}>
                  <div>
                    <p>{m.message}</p>
                    <InfoNote>
                      {'Admin ' + new Date(m.sentDate).toLocaleString()}
                    </InfoNote>
                  </div>
                </MessageReceived>
              );
            }
          })}
        </MessagesContainer>
        <Formik
          enableReinitialize={true}
          initialValues={{
            subject: conversation.subject,
            message: '',
            recipient: conversation.user,
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

  useEffect(() => {
    if (!allUsers) return;

    const result = Object.values(allUsers).reduce((acc, cur) => {
      acc[cur.type] = acc[cur.type] || [];
      acc[cur.type].push(cur);
      return acc;
    }, {});

    setDonors(result.donor);
    setShoppers(result.shopper);
  }, [allUsers]);

  useEffect(() => {
    // If true we want to view archived message threads, else only show current
    // active threads (threads are archived on a nightly basis after 6 months
    // inactivity - it will soon be possible to manually archive, unarchive and
    // permanently delete threads soon...)
    const archived = currentView === 'archived';

    // Load the threads
    getMessages('donor', 'all', archived, token).then(setDonorsMessages);
    getMessages('shopper', 'all', archived, token).then(setShoppersMessages);
  }, [currentView, token, user]);

  useEffect(() => {
    var tabs = tabList(user);
    tabs.forEach((t) => {
      if (t.name === 'Messaging') {
        window.history.pushState({}, '', '/dashboard/' + t.id);
      }
    });
  }, [token, user]);

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <Select
        size="large"
        style={{ width: 180 }}
        value={currentView}
        defaultValue="active"
        onSelect={handleSelectView}
        options={[
          {
            label: 'Active Threads',
            value: 'active',
          },
          {
            label: 'Archived Threads',
            value: 'archived',
          },
        ]}
      />

      <StyledTabList>
        <StyledTab>Shoppers</StyledTab>
        <StyledTab>Donors</StyledTab>
      </StyledTabList>

      <StyledTabPanel>
        <MessagesList
          data={shoppersMessages}
          expandRow={viewConversation}
          type="admin"
        />
        {!newShopperThread && (
          <Button
            primary
            onClick={() => {
              setNewShopperThread(true);
            }}
          >
            Start New Conversation
          </Button>
        )}
        {newShopperThread && (
          <StartMessageThreadAdmin
            users={shoppers}
            cancelFunction={setNewShopperThread}
            submitFunction={handleSubmit}
            type="shopper"
          ></StartMessageThreadAdmin>
        )}
      </StyledTabPanel>
      <StyledTabPanel>
        <MessagesList
          data={donorsMessages}
          expandRow={viewConversation}
          type="admin"
        />
        {!newDonorThread && (
          <Button
            primary
            onClick={() => {
              setNewDonorThread(true);
            }}
          >
            Start New Conversation
          </Button>
        )}
        {newDonorThread && (
          <StartMessageThreadAdmin
            users={donors}
            cancelFunction={setNewDonorThread}
            submitFunction={handleSubmit}
            type="donor"
          ></StartMessageThreadAdmin>
        )}
      </StyledTabPanel>
    </StyledTabs>
  );
};
