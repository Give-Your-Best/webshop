import React, { useContext, useState, useEffect } from "react";
import { AppContext } from '../../../../context/app-context';
import { ShippingLocationsList, LocationMiniEditForm } from '../../../molecules';
import { getAdminLocations, updateLocation, deleteLocation } from '../../../../services/locations';
import { getUsers } from '../../../../services/user';
import { Formik } from 'formik';
import { Modal } from 'antd';
import { Button } from '../../../atoms';

export const ShippingLocations = () => {
  const { token } = useContext(AppContext);
  const [adminLocations, setAdminLocations] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [editingKey, setEditingKey] = useState([]);

  const { confirm } = Modal;

  const handleDelete = (id) => {
    confirm({
      title: `Are you sure you want to delete this location?`,
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

  const updateLocationWrapper = async (recordId, values) => {
    const res = await updateLocation(recordId, values, token);
    if (res.success) {
      setEditingKey('');
      return true;
    } else {
      setErrorMessage(res.message);
    }
  };

  const editLocation = (recordIds, status) => {
    const values = {available: (status==='available')? true: false}
    recordIds.forEach((recordId) => {
      updateLocation(recordId, values)
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

  const addNew = () => {
    console.log('add new');
  }

  useEffect(() => {

    const fetchAdminLocations = async () => {
      const locations = await getAdminLocations(token);
      setAdminLocations(locations);
    };

    const fetchAdminUsers = async () => {
      const users = await getUsers('admin', 'approved', token);
      setAdminUsers(users);
    };

    fetchAdminLocations();
    fetchAdminUsers();

  }, [token]);

  const editForm = (record) => {
    
    const handleSubmit = (values) => {
      updateLocationWrapper(record._id, values)
      .then(() => {
        return true;
      })
    }

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
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  
        <Button onClick={handleEdit}>{editingKey === record._id ? 'Cancel' : 'Edit'}</Button>
      </div>
    )      
  };

  return (
    <ShippingLocationsList data={adminLocations} expandRow={editForm} handleDelete={handleDelete} editLocation={editLocation} addNew={addNew} />
  );
};
