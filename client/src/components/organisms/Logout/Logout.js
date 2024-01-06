import * as React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../context/app-context';
import { Button, H2 } from '../../atoms/';
import { updateItem, deleteItem } from '../../../services/items';
import { bulkUpdateBatchQuantity } from '../../../utils/bulkUpdateBatchQuantity';

export const Logout = () => {
  let history = useHistory();
  const [, , removeCookie] = useCookies();
  const { setUser, setToken, basket, setBasket, token, setBasketTimer } =
    React.useContext(AppContext);

  const handleLogoutClick = () => {
    setUser(null);
    const batchItemsMap = new Map();
    if (basket && basket.length) {
      //clear basket from db
      basket.forEach(async (b) => {
        // if it's a batch item, we need to delete it and capture the data so we can update the corresponding batch item accordingly
        // the logic below deals with aggregating all the batch item data into a map, so that only one 'update' method can be called per batch item.
        if (b.batchId && !b.isTemplateBatchItem) {
          const sizeType =
            b.category === 'shoes' ? 'shoeSizes' : 'clothingSizes';
          const size = b.shoeSize.length > 0 ? b.shoeSize : b.clothingSize;
          if (!batchItemsMap.has(b.batchId)) {
            batchItemsMap.set(b.batchId, {});
          }
          const batchItemDetails = batchItemsMap.get(b.batchId);
          if (
            !Object.prototype.hasOwnProperty.call(batchItemDetails, sizeType)
          ) {
            batchItemDetails[sizeType] = {};
          }
          const sizeTypeDetails = batchItemDetails[sizeType];
          if (!Object.prototype.hasOwnProperty.call(sizeTypeDetails, size)) {
            sizeTypeDetails[size] = 1;
          } else {
            sizeTypeDetails[size] += 1;
          }
          deleteItem(b._id, token);
        } else {
          updateItem(
            b._id,
            { inBasket: false, 'statusUpdateDates.inBasketDate': '' },
            token
          );
        }
      });
      if (batchItemsMap && batchItemsMap.size > 0) {
        bulkUpdateBatchQuantity(batchItemsMap, token);
      }
    }
    setBasket(null);
    setBasketTimer(null);

    setToken(null);
    removeCookie('jwt_user', { path: '/' });
    history.push(`/`);
  };

  return (
    <div>
      <H2>Thanks for stopping by!</H2>
      <Button small primary onClick={handleLogoutClick}>
        Logout
      </Button>
    </div>
  );
};
