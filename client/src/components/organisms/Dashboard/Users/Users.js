import React, { useContext, useState } from "react";
import { AppContext } from '../../../../context/app-context';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab } from './Users.styles';
import { getUsers, deleteUser, updateUser } from '../../../../services/user';
import { Modal } from 'antd';
import { Formik } from 'formik';
import { DonorMiniEditForm, ShopperMiniEditForm, UsersList, DonorCreateForm, ShopperCreateForm } from '../../../molecules';
import { Button } from '../../../atoms';
import { openHiddenTab } from '../../../../utils/helpers';

export const Users = () => {
  const { confirm } = Modal;
  const { token } = useContext(AppContext);
  const [shoppers, setShoppers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = (id, kind) => {
    confirm({
      title: `Are you sure you want to delete this ${kind}?`,
      content: 'This will remove the user',
      onOk() {
        deleteUser(id, token)
        .then(() => {
          if (kind === 'shopper') {
            setShoppers(shoppers.filter(shopper => {
              return shopper._id !== id;
            }));
          } else if (kind === 'donor') {
            setDonors(donors.filter(donor => {
              return donor._id !== id;
            }));
          }
        });
      }
    });
  };

  const editForm = (record) => {
    const handleEditSave = (newRecord) => {
      if (newRecord.kind === 'donor') {
        setDonors(donors.map(donor => {
          if (donor._id === newRecord._id) {
            return Object.assign(donor, newRecord);
          } else { 
            return donor
          }
        }));
  
      } else if (newRecord.kind === 'shopper') {
        setShoppers(shoppers.map(shopper => {
          if (shopper._id === newRecord._id) {
            return Object.assign(shopper, newRecord);
          } else { 
            return shopper
          }
        }));
  
      }
    };
    const handleSubmit = async (values) => {
      const res = await updateUser(record._id, values, token);
      if (res.success) {
        handleEditSave(res.user)
        setEditingKey('');
        return true;
      } else {
        setErrorMessage(res.message);
      }
    };
    const handleEdit = () => {
      setEditingKey((editingKey)? '': record._id)
    }
    return (
      <div>
        <Formik
        initialValues={record}
        onSubmit={handleSubmit}
        >
            { record.kind === 'donor'
              ? <DonorMiniEditForm editingKey={editingKey} recordId={record._id} />
              : ( record.kind === 'shopper' 
                ? <ShopperMiniEditForm editingKey={editingKey} recordId={record._id} />
                : ''
              )
            } 
        </Formik>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  
        <Button small onClick={handleEdit}>{editingKey === record._id ? 'Cancel' : 'Edit'}</Button>
      </div>
    )
  }

  React.useEffect(() => {

    const fetchShoppers = async () => {
      const users = await getUsers('shopper', 'approved', token);
      setShoppers(users);
    };

    const fetchDonors = async () => {
      const users = await getUsers('donor', 'approved', token);
      setDonors(users);
    };

    fetchShoppers();
    fetchDonors();

    return () => {
      // cleanup
    };
  }, [token]);

  const submitFunction = (user, type) => {
    if (user.kind === 'donor') {
      setDonors(donors.concat(user));
    } else if (user.kind === 'shopper') {
      setShoppers(shoppers.concat(user));
    }
  }
  
  return (
    <StyledTabs forceRenderTabPanel={true}>
    <StyledTabList>
      <StyledTab className='shopperlist'>Shoppers</StyledTab>
      <StyledTab className='donorlist'>Donors</StyledTab>
      <HiddenStyledTab className='addshopper'>Add Shopper</HiddenStyledTab>
      <HiddenStyledTab className='adddonor'>Add Donor</HiddenStyledTab>
    </StyledTabList>

    <StyledTabPanel>
      <UsersList data={shoppers} handleDelete={handleDelete} expandRow={editForm} />
      <Button onClick={() => {openHiddenTab('shopper')}}>Create</Button>
    </StyledTabPanel>
    <StyledTabPanel>
      <UsersList data={donors} handleDelete={handleDelete} expandRow={editForm} />
      <Button onClick={() => {openHiddenTab('donor')}}>Create</Button>
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
