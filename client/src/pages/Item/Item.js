import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/app-context';
import { getItem, getBatchItem } from '../../services/items';
import { ItemDetailsWrapper, ItemWrapper, DonorLink } from './Item.styles';
import { Container, ImageGallery, CategoryBreadcrumbs } from '../../components';
import { ColourCircles } from '../../components/atoms';
import { getSetting } from '../../services/settings';
import { sizeOptions } from '../../utils/sizeOptions';
import BatchQuantitySelector from './BatchQuantitySelector';
import AddItemToBasket from './AddItemToBasket';
import AddBatchItemToBasket from './AddBatchItemToBasket';
import { Form } from 'formik-antd';
import { Formik } from 'formik';
import { convertUnderscoreToDot } from '../../utils/convertUnderscoreToDot';
import RemoveFromBasketButton from '../../components/molecules/Button/RemoveFromBasketButton';

export const Item = () => {
  const { token, basket } = useContext(AppContext);
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState({});
  const [mainImage, setMainImage] = useState({});
  const [otherImages, setOtherImages] = useState([]);
  const [limit, setLimit] = useState(0);
  const [batchItem, setBatchItem] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [batchSizes, setBatchSizes] = useState({});
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isShopped, setIsShopped] = useState(false);
  const mountedRef = useRef(true);

  const colours = () => {
    return itemDetails.colors
      ? itemDetails.colors.map((c) => {
          return <ColourCircles key={c} colour={c} />;
        })
      : '';
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchItemDetails = async () => {
      const itemDetails = await getItem(itemId);
      if (!mountedRef.current) return null;
      setItemDetails(itemDetails);

      //get front image or just the first in the list
      let frontImage = itemDetails.photos.filter((i) => i.front === true);
      setMainImage(frontImage.length ? frontImage[0] : itemDetails.photos[0]);

      if (itemDetails.photos.length > 1) {
        setOtherImages(
          frontImage.length
            ? itemDetails.photos.filter((i) => i.front !== true)
            : itemDetails.photos.slice(1)
        );
      }
    };
    const fetchSetting = async () => {
      if (!token) return null;
      const settingValue = await getSetting('shopItemLimit', token);
      if (!mountedRef.current) return null;
      setLimit(settingValue);
    };

    fetchItemDetails();
    fetchSetting();

    return () => {
      mountedRef.current = false;
    };
  }, [itemId, token]);

  useEffect(() => {
    const updatedIsShopped =
      basket && basket.some((i) => i._id === itemDetails._id);
    setIsShopped(updatedIsShopped);
  }, [basket, itemDetails]);

  useEffect(() => {
    const fetchSizes = async () => {
      const options = sizeOptions(
        itemDetails.category,
        itemDetails.subCategory
      );
      if (options.length > 0) {
        if (options[0].fieldName === 'clothingSize') {
          setSizes(itemDetails.clothingSize);
        } else {
          setSizes(itemDetails.shoeSize);
        }
      }
    };
    fetchSizes();
  }, [itemDetails]);

  useEffect(() => {
    const fetchBatchItem = async () => {
      if (itemDetails.batchId && itemDetails.isTemplateBatchItem) {
        const batchItemData = await getBatchItem(itemDetails.batchId);
        const batchItem = batchItemData.batchItem;
        if (
          batchItem.clothingSizes !== null &&
          batchItem.clothingSizes !== undefined &&
          Object.keys(batchItem.clothingSizes).length !== 0
        ) {
          setBatchSizes(batchItem.clothingSizes);
        } else {
          setBatchSizes(batchItem.shoeSizes);
        }
        setBatchItem(batchItem);
      }
    };
    fetchBatchItem();
  }, [itemDetails.batchId, itemDetails.isTemplateBatchItem, quantity]);

  const changeMainImage = (e) => {
    const imageId = e.target.getAttribute('data-id');

    setMainImage(
      itemDetails.photos.filter((photo) => {
        return photo._id === imageId;
      })[0]
    );

    setOtherImages(
      itemDetails.photos.filter((photo) => {
        return photo._id !== imageId;
      })
    );
  };

  const resetBatchItemDetails = () => {
    setSelectedSize('');
    setQuantity(0);
  };

  return (
    <Container>
      <Formik initialValues={{ size: '', quantity: 1 }}>
        <Form>
          <CategoryBreadcrumbs
            category={itemDetails.category}
            subCategory={itemDetails.subCategory}
          />
          <ItemWrapper>
            <ImageGallery
              changeMainImage={changeMainImage}
              mainImage={mainImage}
              otherImages={otherImages}
            />
            <ItemDetailsWrapper>
              <h1>{itemDetails.name}</h1>
              <p>{itemDetails.description || ''}</p>
              <p>Colour: {colours()}</p>
              <p>Brand: {itemDetails.brand || ''}</p>

              {batchItem && batchSizes ? (
                <BatchQuantitySelector
                  sizes={convertUnderscoreToDot(batchSizes)}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              ) : (
                <p>
                  Size: {sizes.join(', ')}{' '}
                  <a target="_blank" rel="noreferrer" href="/sizing-guide">
                    size guide
                  </a>
                </p>
              )}
              <DonorLink to={'/donorproducts/' + itemDetails.donorId}>
                See other items by this donor
              </DonorLink>
              {isShopped ? (
                <RemoveFromBasketButton itemId={itemDetails._id}>
                  Remove from Basket
                </RemoveFromBasketButton>
              ) : (
                itemDetails.status === 'in-shop' && (
                  <>
                    {batchItem ? (
                      <AddBatchItemToBasket
                        item={itemDetails}
                        batchItem={batchItem}
                        limit={limit}
                        selectedSize={selectedSize}
                        quantity={quantity}
                        afterAddToBasket={resetBatchItemDetails}
                      />
                    ) : (
                      <AddItemToBasket item={itemDetails} limit={limit} />
                    )}
                  </>
                )
              )}
            </ItemDetailsWrapper>
          </ItemWrapper>
        </Form>
      </Formik>
    </Container>
  );
};
