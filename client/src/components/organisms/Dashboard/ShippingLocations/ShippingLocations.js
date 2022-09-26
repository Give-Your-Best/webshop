import React, { useContext, useState, useEffect, useRef } from "react";
import { Formik } from 'formik';
import { Modal } from 'antd';
import { AppContext } from '../../../../context/app-context';
import { ShippingLocationsList, LocationMiniEditForm, LocationCreateForm } from '../../../molecules';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab } from './ShippingLocations.styles';
import { getAdminLocations, updateLocation, deleteLocation } from '../../../../services/locations';
import { getUsers } from '../../../../services/user';
import { Button } from '../../../atoms';
import { openHiddenTab, tabList } from "../../../../utils/helpers";

export const ShippingLocations = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [adminLocations, setAdminLocations] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [editingKey, setEditingKey] = useState([]);

  const { confirm } = Modal;

  const handleDelete = (id) => {
    confirm({
      title: `Are you sure you want to delete this location?`,
      className: "modalStyle",
      onOk() {
        deleteLocation(id, token)
        .then(() => {
          setAdminLocations(adminLocations.filter(location => {
            return location._id !== id;
          }));
        });
      }
    });
  };

  const editLocation = (recordIds, status) => {
    
    const values = {available: (status==='available')? true: false}
    recordIds.forEach((recordId) => {
      updateLocation(recordId, values, token)
      .then(() => {
        setAdminLocations(adminLocations.filter(location => {
          if (location._id !== recordId) {
            return location
          } else {
            return Object.assign(location, {available: (status==='available')? true: false})
          }
        }));
      })
    });
    return;
  }

  useEffect(() => {

    //add to url history (added for back button to work)
    var tabs = tabList(user);
    tabs.forEach((t) => {
      let url = '/dashboard/' + t.id;
      if (t.id === 'adminLocations' && window.location !== url) {
        window.history.pushState({}, '', url)
      }
    })

    const fetchAdminLocations = async () => {
      const locations = await getAdminLocations('', token);
      if (!mountedRef.current) return null;
      setAdminLocations(locations);
    };

    const fetchAdminUsers = async () => {
      const users = await getUsers('admin', 'approved', token);
      if (!mountedRef.current) return null;
      setAdminUsers(users);
    };

    fetchAdminLocations();
    fetchAdminUsers();

    return () => {
      // cleanup
      mountedRef.current = false;
    };

  }, [token, user]);

  const editForm = (record) => {
    const handleEditSave = (newRecord) => {
      setAdminLocations(adminLocations.map(location => {
        if (location._id === newRecord._id) {
          return Object.assign(location, newRecord);
        } else { 
          return location
        }
      }));
  };
  

    const handleSubmit = async (values) => {
      const res = await updateLocation(record._id, values, token);
      if (res.success) {
        handleEditSave(res.location);
        setEditingKey('');
        return true;
      } else {
        setErrorMessage(res.message);
        console.log(errorMessage)
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
          <LocationMiniEditForm recordId={record._id} editingKey={editingKey} users={adminUsers} />
        </Formik> 
        <Button primary onClick={handleEdit}>{editingKey === record._id ? 'Cancel' : 'Edit'}</Button>
      </div>
    )      
  };
  const submitFunction = (location) => {
    setAdminLocations(adminLocations.concat(location));
  }

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <StyledTabList>
        <StyledTab className='locationlist'>Shipping locations</StyledTab>
        <HiddenStyledTab className='addlocation'>Add Location</HiddenStyledTab>
      </StyledTabList>

      <StyledTabPanel>
      <ShippingLocationsList data={adminLocations} expandRow={editForm} handleDelete={handleDelete} editLocation={editLocation} addNew={() => {openHiddenTab('location')}} />
      </StyledTabPanel>
      <StyledTabPanel>
        <LocationCreateForm submitFunction={submitFunction} users={adminUsers} />
      </StyledTabPanel>

    </StyledTabs>

  );
};
