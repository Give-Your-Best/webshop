import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../../context/app-context';
import { AccountContext } from '../../../../context/account-context';
import {
  StyledTab,
  StyledTabList,
  StyledTabs,
  StyledTabPanel,
  HiddenStyledTab,
} from './Users.styles';
import {
  getUser,
  deleteUser,
  updateDonor,
  updateShopper,
} from '../../../../services/user';
import { deleteDonorItems } from '../../../../services/items';
import { Modal } from 'antd';
import { Formik } from 'formik';
import {
  DonorMiniEditForm,
  ShopperMiniEditForm,
  UsersList,
  DonorCreateForm,
  ShopperCreateForm,
} from '../../../molecules';
import { Button, Space } from '../../../atoms';
import { Tags } from '../../../organisms';
import { openHiddenTab, tabList } from '../../../../utils/helpers';

export const Users = () => {
  const { confirm } = Modal;
  const { token, user } = useContext(AppContext);
  const { allTags, allUsers, setAllUsers } = useContext(AccountContext);
  const [shoppers, setShoppers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeRecords, setActiveRecords] = useState({});

  // TODO this belongs with the global helpers
  const updateContext = (data) => {
    const { firstName, lastName, email, kind, _id } = data;

    setAllUsers({
      ...allUsers,
      [_id]: {
        name: `${firstName} ${lastName}`.trim(),
        email: email,
        _id: _id,
        type: kind,
      },
    });
  };

  const handleDelete = (id, kind) => {
    confirm({
      title: `Are you sure you want to delete this ${kind}?`,
      className: 'modalStyle',
      content: 'This will remove the user',
      onOk() {
        deleteUser(id, token).then(() => {
          // eslint-disable-next-line no-unused-vars
          const { [id]: _discard, ...rest } = allUsers;
          setAllUsers(rest);

          if (kind === 'donor') {
            deleteDonorItems(id, token);
          }
        });
      },
    });
  };

  const handleExpand = (expanded, record) =>
    expanded &&
    getUser(record._id, token).then((u) =>
      setActiveRecords({
        ...activeRecords,
        [u._id]: u,
      })
    );

  const editForm = (user) => {
    const currentRecord = activeRecords[user._id];

    const templateForm = (
      <>
        <Tags tagList={[]} />
        <Space />
        <Formik initialValues={{}}>
          {user.type === 'donor' ? (
            <DonorMiniEditForm />
          ) : user.type === 'shopper' ? (
            <ShopperMiniEditForm />
          ) : (
            ''
          )}
        </Formik>
      </>
    );

    if (!currentRecord) {
      return templateForm;
    }

    if (user._id !== currentRecord._id) {
      return templateForm;
    }

    const handleSubmit = async (values) => {
      const res = await {
        donor: updateDonor,
        shopper: updateShopper,
      }[currentRecord.kind](currentRecord._id, values, token);

      if (res.success) {
        updateContext(res.user);
        setEditingKey('');
        return true;
      } else {
        setErrorMessage(res.message);
      }
    };

    const handleEdit = () => {
      setEditingKey(editingKey ? '' : currentRecord._id);
    };

    return (
      <div>
        <Tags
          updateId={currentRecord._id}
          tagList={currentRecord.tags || []}
          availableTags={allTags}
          updateType="user"
        />
        <Space />
        <Formik initialValues={currentRecord} onSubmit={handleSubmit}>
          {user.type === 'donor' ? (
            <DonorMiniEditForm
              editingKey={editingKey}
              recordId={currentRecord._id}
            />
          ) : user.type === 'shopper' ? (
            <ShopperMiniEditForm
              editingKey={editingKey}
              recordId={currentRecord._id}
            />
          ) : (
            ''
          )}
        </Formik>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Button primary onClick={handleEdit}>
          {editingKey === currentRecord._id ? 'Cancel' : 'Edit'}
        </Button>
      </div>
    );
  };

  // TODO this can be a lot nicer
  useEffect(() => {
    const { shopper, donor } = Object.values(allUsers || {}).reduce(
      (acc, cur) => {
        if (cur.type !== 'admin') {
          acc[cur.type].push(cur);
        }
        return acc;
      },
      { donor: [], shopper: [] }
    );

    setShoppers(shopper);
    setDonors(donor);
  }, [allUsers]);

  useEffect(() => {
    var tabs = tabList(user);
    tabs.forEach((t) => {
      if (t.id === 'adminUsers') {
        window.history.pushState({}, '', '/dashboard/' + t.id);
      }
    });
  }, [token, user]);

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <StyledTabList>
        <StyledTab className="shopperlist">Shoppers</StyledTab>

        <StyledTab className="donorlist">Donors</StyledTab>

        <HiddenStyledTab className="addshopper">Add Shopper</HiddenStyledTab>

        <HiddenStyledTab className="adddonor">Add Donor</HiddenStyledTab>
      </StyledTabList>

      <StyledTabPanel>
        <UsersList
          data={shoppers}
          handleDelete={handleDelete}
          expandRow={editForm}
          onExpand={handleExpand}
          allTags={allTags}
        />

        <Button
          primary
          small
          onClick={() => {
            openHiddenTab('shopper');
          }}
        >
          Create
        </Button>
      </StyledTabPanel>

      <StyledTabPanel>
        <UsersList
          data={donors}
          handleDelete={handleDelete}
          expandRow={editForm}
          onExpand={handleExpand}
          allTags={allTags}
        />

        <Button
          primary
          small
          onClick={() => {
            openHiddenTab('donor');
          }}
        >
          Create
        </Button>
      </StyledTabPanel>

      <StyledTabPanel>
        <ShopperCreateForm submitFunction={updateContext} />
      </StyledTabPanel>

      <StyledTabPanel>
        <DonorCreateForm submitFunction={updateContext} />
      </StyledTabPanel>
    </StyledTabs>
  );
};
