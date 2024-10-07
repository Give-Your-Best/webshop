import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Modal, Tooltip } from 'antd';
import { AppContext } from '../../../../context/app-context';
import {
  ItemsCollapsedList,
  ItemMiniEditForm,
  ItemCreateForm,
} from '../../../molecules';
import {
  StyledAlert,
  StyledTabListHidden,
  StyledTabs,
  StyledTabPanel,
  HiddenStyledTab,
} from './DonorItems.styles';
import {
  getDonorItems,
  updateItem,
  updateBatchItem,
  deleteItem,
  deleteBatchItem,
  getItem,
} from '../../../../services/items';
import { Button, H2 } from '../../../atoms';
import { openHiddenTab, reopenTab, tabList } from '../../../../utils/helpers';
import {
  sortQuantities,
  calculateTotalQuantity,
} from '../../../../utils/batchItemHelpers';
import { itemCreateschema } from '../../../../utils/validation';

export const DonorItems = () => {
  const { token, user } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [canAddItems, setCanAddItems] = useState(false);
  const [pastItems, setPastItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [editingKey, setEditingKey] = useState([]);
  const [images, setImages] = useState([]);
  const { confirm } = Modal;

  useEffect(() => {
    var tabs = tabList(user);

    tabs.forEach((t) => {
      if (t.id === 'donorItems') {
        window.history.pushState({}, '', '/dashboard/' + t.id);
      }
    });
  }, [token, user]);

  const fetchItems = useCallback(async () => {
    const [shopItems, pastItems, restItems] = await Promise.all([
      getDonorItems(user.id, 'in-shop'),
      getDonorItems(user.id, 'received'),
      getDonorItems(user.id),
    ]);

    setItems(shopItems);
    setPastItems(pastItems);

    // Donor not yet marked trusted can upload no more than 5 items
    setCanAddItems(
      user.trustedDonor || [...shopItems, ...pastItems, ...restItems].length < 5
    );
  }, [user.id, user.trustedDonor]);

  useEffect(fetchItems, [user, token, fetchItems]);

  const handleDelete = (id) => {
    confirm({
      title: `Are you sure you want to delete this item?`,
      className: 'modalStyle',
      onOk() {
        getItem(id).then((itemToDelete) => {
          if (itemToDelete.batchId !== null) {
            deleteBatchItem(id).then(() => fetchItems());
          } else {
            deleteItem(id, token).then(() => fetchItems());
          }
        });
      },
    });
  };

  const editItem = (recordIds, status) => {
    const values = { available: status === 'available' ? true : false };
    recordIds.forEach((recordId) => {
      updateItem(recordId, values, token).then(() => {
        setItems(
          items.filter((item) => {
            if (item._id !== recordId) {
              return item;
            } else {
              return Object.assign(item, {
                available: status === 'available' ? true : false,
              });
            }
          })
        );
      });
    });
    return;
  };

  const editItemLiveStatus = (recordIds, status) => {
    const values = { live: status };
    recordIds.forEach((recordId) => {
      updateItem(recordId, values, token).then(() => {
        setItems(
          items.filter((item) => {
            if (item._id !== recordId) {
              return item;
            } else {
              return Object.assign(item, { live: status });
            }
          })
        );
      });
    });
    return;
  };

  const editForm = (record) => {
    const handleEditSave = (newRecord) => {
      // force refresh - bug fix to do
      setItems(
        items.map((item) => {
          if (item._id === newRecord._id) {
            return Object.assign(item, newRecord);
          } else {
            return item;
          }
        })
      );
    };

    const handleSubmit = async (values, { setFieldValue }) => {
      setFieldValue('photos', values.photos);
      if (images.length > 0) {
        values.photos = images;
      }
      let res = {};
      if (values.batchId) {
        const sortedValues = sortQuantities(values);
        sortedValues.quantity = calculateTotalQuantity(sortedValues);
        res = await updateBatchItem(record._id, sortedValues, token);
      } else {
        res = await updateItem(record._id, values, token);
      }
      if (res.success) {
        handleEditSave(res.item);
        setEditingKey('');
        return true;
      } else {
        setErrorMessage(res.message);
      }
    };

    const handleEdit = () => {
      setEditingKey(editingKey ? '' : record._id);
    };

    return (
      <div>
        <Formik
          initialValues={record}
          onSubmit={handleSubmit}
          validationSchema={itemCreateschema}
        >
          <ItemMiniEditForm
            photos={record.photos}
            recordId={record._id}
            editingKey={editingKey}
            handleImageUpdate={setImages}
          />
        </Formik>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {record.status !== 'received' ? (
          <Button primary small onClick={handleEdit}>
            {editingKey === record._id ? 'Cancel' : 'Edit'}
          </Button>
        ) : (
          ''
        )}
      </div>
    );
  };

  const submitFunction = () => {
    fetchItems();
  };

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <StyledTabListHidden>
        <HiddenStyledTab className="itemslist">My items</HiddenStyledTab>
        <HiddenStyledTab className="additem">Upload Item</HiddenStyledTab>
        <HiddenStyledTab className="pastitemslist">
          My Past Items
        </HiddenStyledTab>
      </StyledTabListHidden>

      <StyledTabPanel>
        <H2>My Available Items</H2>

        {user.trustedDonor && (
          <>
            <StyledAlert
              description={
                'For security reasons, all new donors will be able to upload a maximum of 5 items initially. Once those items have been received and inspected by the GYB team, you will be able to upload more items freely, parcel checks will be conducted periodically and randomly thereafter for safeguarding purposes.'
              }
              type={'info'}
            />
            <br />
          </>
        )}
        <ItemsCollapsedList
          data={items}
          expandRow={editForm}
          handleDelete={handleDelete}
          editItem={editItem}
          editItemLiveStatus={editItemLiveStatus}
        />
        <Button primary small onClick={() => reopenTab('pastitems')}>
          View Past Items
        </Button>

        {canAddItems ? (
          <Button primary small onClick={() => openHiddenTab('item')}>
            Add Item
          </Button>
        ) : (
          <Tooltip title="You cannot add more items at this time">
            <div>
              <Button disabled small>
                Add Item
              </Button>
            </div>
          </Tooltip>
        )}
      </StyledTabPanel>
      <StyledTabPanel>
        <H2>Add Item</H2>
        <ItemCreateForm submitFunction={submitFunction} photos={[]} />
      </StyledTabPanel>
      <StyledTabPanel>
        <H2>Past Items</H2>
        <ItemsCollapsedList
          data={pastItems}
          expandRow={editForm}
          reOpen={() => {
            reopenTab('items');
          }}
        />
      </StyledTabPanel>
    </StyledTabs>
  );
};
