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
// import { deleteDonorItems } from '../../../../services/items'; // TODO
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
  const [currentRecord, setCurrentRecord] = useState(null);

  console.log('hello');

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

  // TODO - user setAllUsers to update the context...
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

          // TODO deleteDonorItems deleteDonorItems deleteDonorItems
          // if (kind === 'shopper') {
          //   setShoppers(
          //     shoppers.filter((shopper) => {
          //       return shopper._id !== id;
          //     })
          //   );
          // } else if (kind === 'donor') {
          //   deleteDonorItems(id, token);
          //   setDonors(
          //     donors.filter((donor) => {
          //       return donor._id !== id;
          //     })
          //   );
          // }
        });
      },
    });
  };

  const handleExpand = (expanded, record) =>
    expanded
      ? getUser(record._id, token).then(setCurrentRecord)
      : setCurrentRecord(null);

  const editForm = (user) => {
    if (!currentRecord) {
      return;
    }

    if (user._id !== currentRecord._id) {
      return;
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
          {currentRecord.kind === 'donor' ? (
            <DonorMiniEditForm
              editingKey={editingKey}
              recordId={currentRecord._id}
            />
          ) : currentRecord.kind === 'shopper' ? (
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
