import React, { useContext, useState, useEffect, useRef } from "react";
import { Formik } from 'formik';
import { Modal } from 'antd';
import { AppContext } from '../../../../context/app-context';
import { ItemsCollapsedList, ItemMiniEditForm, ItemCreateForm } from '../../../molecules';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab } from './DonorItems.styles';
import { getDonorItems, updateItem, deleteItem } from '../../../../services/items';
import { Button } from '../../../atoms';
import { openHiddenTab, reopenTab } from "../../../../utils/helpers";
import { itemCreateschema } from "../../../../utils/validation";

export const DonorItems = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [items, setItems] = useState([]);
  const [pastItems, setPastItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [editingKey, setEditingKey] = useState([]);
  const [images, setImages] = useState([]);
  const { confirm } = Modal;

  const handleDelete = (id) => {
    confirm({
      title: `Are you sure you want to delete this item?`,
      onOk() {
        deleteItem(id, token)
        .then(() => {
            setItems(items.filter(item => {
            return item._id !== id;
          }));
        });
      }
    });
  };

  const editItem = (recordIds, status) => {
    const values = {available: (status==='available')? true: false}
    recordIds.forEach((recordId) => {
      updateItem(recordId, values, token)
      .then(() => {
        setItems(items.filter(item => {
          if (item._id !== recordId) {
            return item
          } else {
            return Object.assign(item, {available: (status==='available')? true: false})
          }
        }));
      })
    });
    return;
  }

  useEffect(() => {

    const fetchItems = async () => {
        const items = await getDonorItems(user.id, 'in-shop');
        if (!mountedRef.current) return null;
        setItems(items);
    };

    const fetchPastItems = async () => {
      const items = await getDonorItems(user.id, 'received');
      if (!mountedRef.current) return null;
      setPastItems(items);
    };

    fetchItems();
    fetchPastItems();

    return () => {
      // cleanup
      mountedRef.current = false;
    };

}, [token, user]);

  const editForm = (record) => {
    const handleEditSave = (newRecord) => {
      // force refresh - bug fix to do
      setItems(items.map(item => {
        if (item._id === newRecord._id) {
          return Object.assign(item, newRecord);
        } else { 
          return item
        }
      }));
    };

    const handleSubmit = async (values, {setFieldValue}) => {
      setFieldValue("photos", values.photos)
      if (images.length > 0) {
        values.photos = images;
      }
      const res = await updateItem(record._id, values, token);
      if (res.success) {
        handleEditSave(res.item);
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
        validationSchema={itemCreateschema}
        >
          <ItemMiniEditForm photos={record.photos} recordId={record._id} editingKey={editingKey} handleImageUpdate={setImages} />
        </Formik> 
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  
        {
          (record.status !== 'received')? 
          <Button primary small onClick={handleEdit}>{editingKey === record._id ? 'Cancel' : 'Edit'}</Button>
          : ''
        }
      </div>
    )      
  };
  const submitFunction = (item) => {
    setItems(items.concat(item));
  }

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <StyledTabList>
        <StyledTab className='itemslist'>My items</StyledTab>
        <HiddenStyledTab className='additem'>Upload Item</HiddenStyledTab>
        <HiddenStyledTab className='pastitemslist'>My Past Items</HiddenStyledTab>
      </StyledTabList>

      <StyledTabPanel>
        <ItemsCollapsedList data={items} expandRow={editForm} handleDelete={handleDelete} editItem={editItem} />
        <Button primary small onClick={() => reopenTab('pastitems')}>View Past Items</Button>
        <Button primary small onClick={() => openHiddenTab('item')}>Upload Item</Button>
      </StyledTabPanel>
      <StyledTabPanel>
        <ItemCreateForm submitFunction={submitFunction} photos={[]} />
      </StyledTabPanel>
      <StyledTabPanel>
        <ItemsCollapsedList data={pastItems} expandRow={editForm} reOpen={() => {reopenTab('items')}} />
      </StyledTabPanel>

    </StyledTabs>

  );
};