import { updateBatchItemQuantity } from './updateBatchItemQuantity';
import { deleteItem, updateItem } from '../services/items';
import { Notification } from '../components/atoms';

const resetBasketTimer = async (
  basket,
  setBasket,
  basketTimer,
  setBasketTimer,
  newItems,
  token
) => {
  clearTimeout(basketTimer);
  setBasketTimer(
    setTimeout(async () => {
      if (basket && basket.length) {
        basket.concat(newItems).forEach(async (b) => {
          if (b.batchId && !b.isTemplateBatchItem) {
            const size = b.shoeSize ? 'shoeSizes' : 'clothingSizes';
            await updateBatchItemQuantity(
              size,
              b.category,
              b.batchId,
              1,
              true,
              token
            );
            await deleteItem(b, token);
          } else {
            await updateItem(
              b._id,
              { inBasket: false, 'statusUpdateDates.inBasketDate': '' },
              token
            );
          }
        });
        Notification(
          'Items expired!',
          'The items in your basket have expired.',
          'warning'
        );
      }
      setBasket(null);
      setBasketTimer(null);
    }, 3600000)
  ); //expires after an hour
};

export { resetBasketTimer };
