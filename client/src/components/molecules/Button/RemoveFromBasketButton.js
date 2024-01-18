import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Modal } from 'antd';
import { Button } from '../../atoms/Button/Button';
import { updateItem, deleteItem } from '../../../services/items';
import { updateBatchItemQuantity } from '../../../utils/batchItemHelpers';
import { useHistory } from 'react-router-dom';

const RemoveFromBasketButton = ({ itemId, children }) => {
  const { setBasket, basket, token, basketTimer } = useContext(AppContext);
  let history = useHistory();

  const removeFromBasket = () => {
    Modal.confirm({
      title: `Are you sure you wish to remove from your basket?`,
      className: 'modalStyle',
      onOk() {
        clearTimeout(basketTimer);
        setBasket(
          basket.filter((item) => {
            if (item._id === itemId) {
              if (item.batchId && !item.isTemplateBatchItem) {
                const size =
                  item.shoeSize.length > 0 ? item.shoeSize : item.clothingSize;
                updateBatchItemQuantity(
                  size,
                  item.category,
                  item.batchId,
                  1,
                  true,
                  token
                );
                deleteItem(item._id, token);
              } else {
                updateItem(
                  item._id,
                  { inBasket: false, 'statusUpdateDates.inBasketDate': '' },
                  token
                );
              }
            }
            return item._id !== itemId;
          })
        );
        // Navigate to '/basket' after the item has been removed
        history.push('/basket');
      },
    });
  };

  return (
    <Button
      primary
      small
      onClick={(e) => {
        e.stopPropagation();
        removeFromBasket();
      }}
    >
      {children}
    </Button>
  );
};

export default RemoveFromBasketButton;
