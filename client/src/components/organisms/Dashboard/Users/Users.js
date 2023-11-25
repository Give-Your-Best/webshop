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
  const { allTags, allUsers } = useContext(AccountContext);
  const [shoppers, setShoppers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // TODO
  const [currentRecord, setCurrentRecord] = useState(null);

  // TODO - user setAllUsers to update the context...
  const handleDelete = (id, kind) => {
    confirm({
      title: `Are you sure you want to delete this ${kind}?`,
      className: 'modalStyle',
      content: 'This will remove the user',
      onOk() {
        deleteUser(id, token).then(() => {
          if (kind === 'shopper') {
            setShoppers(
              shoppers.filter((shopper) => {
                return shopper._id !== id;
              })
            );
          } else if (kind === 'donor') {
            deleteDonorItems(id, token);
            setDonors(
              donors.filter((donor) => {
                return donor._id !== id;
              })
            );
          }
        });
      },
    });
  };

  const editForm = (user) => {
    if (!currentRecord) {
      return;
    }

    if (user.id !== currentRecord._id) {
      return;
    }

    // TODO - user setAllUsers to update the context...
    const handleEditSave = (newRecord) => {
      if (newRecord.kind === 'donor') {
        setDonors(
          donors.map((donor) => {
            if (donor._id === newRecord._id) {
              return Object.assign(donor, newRecord);
            } else {
              return donor;
            }
          })
        );
      } else if (newRecord.kind === 'shopper') {
        setShoppers(
          shoppers.map((shopper) => {
            if (shopper._id === newRecord._id) {
              return Object.assign(shopper, newRecord);
            } else {
              return shopper;
            }
          })
        );
      }
    };

    const handleSubmit = async (values) => {
      if (currentRecord.kind === 'donor') {
        const res = await updateDonor(currentRecord._id, values, token);
        if (res.success) {
          handleEditSave(res.user);
          setEditingKey('');
          return true;
        } else {
          setErrorMessage(res.message);
        }
      } else if (currentRecord.kind === 'shopper') {
        const res = await updateShopper(currentRecord._id, values, token);
        if (res.success) {
          handleEditSave(res.user);
          setEditingKey('');
          return true;
        } else {
          setErrorMessage(res.message);
        }
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
    const { shopper, donor } = (allUsers || []).reduce(
      (acc, cur) => {
        if (cur.type !== 'admin') {
          acc[cur.type].push(cur);
        }
        return acc;
      },
      {
        shopper: [],
        donor: [],
      }
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

  const submitFunction = (user) => {
    if (user.kind === 'donor') {
      setDonors(donors.concat(user));
    } else if (user.kind === 'shopper') {
      setShoppers(shoppers.concat(user));
    }
  };

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
          allTags={allTags}
          onExpand={(record, event) => {
            console.log({ record, event });

            record
              ? getUser(event.id, token).then(setCurrentRecord)
              : setCurrentRecord(null);
          }}
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
          allTags={allTags}
          onExpand={(record, event) => {
            console.log({ record, event });

            record
              ? getUser(event.id, token).then(setCurrentRecord)
              : setCurrentRecord(null);
          }}
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
        <ShopperCreateForm submitFunction={submitFunction} />
      </StyledTabPanel>
      <StyledTabPanel>
        <DonorCreateForm submitFunction={submitFunction} />
      </StyledTabPanel>
    </StyledTabs>
  );
};
