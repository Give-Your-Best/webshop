import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { AppContext } from '../../context/app-context';
import { getItem, updateItem } from '../../services/items';
import { ItemDetailsWrapper, ItemWrapper, DonorLink } from './Item.styles';
import { Container, ImageGallery, CategoryBreadcrumbs } from '../../components';
import { ColourCircles, Button, Notification }from '../../components/atoms';
import { useHistory } from 'react-router-dom';
import { getSetting } from '../../services/settings';
import { getDate } from '../../utils/helpers';

export const Item = () => {
  const { user, setBasket, basket, token, basketTimer, setBasketTimer } = useContext(AppContext);
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState({});
  const [mainImage, setMainImage] = useState({})
  const [otherImages, setOtherImages] = useState([]);
  const [ limit, setLimit ] = useState(0);
  const { confirm } = Modal;
  let history = useHistory();
  const mountedRef = useRef(true);

  const colours = () => {
    return (itemDetails.colors)? itemDetails.colors.map((c)=>{return (<ColourCircles key={c} colour={c} />);}): '';
  }

  const size = () => {
    return (itemDetails.category === 'shoes')? (itemDetails.shoeSize)? itemDetails.shoeSize.join(', '): '' : (itemDetails.clothingSize)? itemDetails.clothingSize.join(', '): '';
  }

  const basketReset = (itemDetails) => {
    clearTimeout(basketTimer);
    setBasketTimer(setTimeout(() => {
      if (basket && basket.length) {
        //clear basket from db
        basket.concat(itemDetails).forEach(async (b) => {
          await updateItem(b._id, {'inBasket': false, 'statusUpdateDates.inBasketDate': ''}, token);
        });
        Notification('Items expired!', 'The items in your basket have expired.', 'warning');
      }

      setBasket(null);
      setBasketTimer(null);

      }, 3600000)) //expires after an hour
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchItemDetails = async () => {
      const itemDetails = await getItem(itemId);
      if (!mountedRef.current) return null;
      setItemDetails(itemDetails);

      //get front image or just the first in the list
      let frontImage = itemDetails.photos.filter(i => i.front === true);
      setMainImage((frontImage.length)? frontImage[0]: itemDetails.photos[0]);

      if (itemDetails.photos.length > 1) {
        setOtherImages((frontImage.length)? itemDetails.photos.filter(i => i.front !== true): itemDetails.photos.slice(1))
      }
    };
    const fetchSetting = async () => {
      if (!token) return null;
      const settingValue = await getSetting('shopItemLimit', token);
      if (!mountedRef.current) return null;
      setLimit(settingValue);
    }
  
    fetchItemDetails();
    fetchSetting();

    return () => {
      mountedRef.current = false;
    };

  }, [itemId, token]);

  const changeMainImage = (e) => {
    const imageId = e.target.getAttribute('data-id');

    setMainImage(itemDetails.photos.filter(photo => {
      return photo._id === imageId;
    })[0]);

    setOtherImages(itemDetails.photos.filter(photo => {
      return photo._id !== imageId;
    }));
  }

  const addToBasket = async (itemId) => {
    const isShopped = basket && basket.some(i=>i._id === itemId);

    //recent items shopped count and items in basket count needs to be within limit. Limit is calculated from the shop settings and multiplied by the number of people the user is shopping for
    const cannotShop = ((user)? user.recentItems.length: 0) + ((basket)? basket.length: 0) >= (limit * ((user)? user.shoppingFor: 1));

    if (!user || user.type !== 'shopper') { //if not signed in
      confirm({
        title: `Please sign up as a shopper to shop!`,
        className: "modalStyle"
      });
      return;
    }

    if (isShopped) { //if alerady in basket
      confirm({
        className: "modalStyle",
        title: `This item is already in your basket`
      });
      return;
    }

    if (cannotShop) { //if limit reached
      confirm({
        className: "modalStyle",
        title: `You have reached your weekly shopping limit!`,
        content: 'Please check your current orders on your account profile.'
      });
      return;
    }

    const itemDetails = await getItem(itemId);
    let anHourAgo = new Date(new Date().getTime() - 1000 * 60 * 60);
    let basketDate = (itemDetails.statusUpdateDates && itemDetails.statusUpdateDates.inBasketDate)? (new Date(itemDetails.statusUpdateDates.inBasketDate)):'';

    if ((itemDetails.inBasket === true && basketDate >= anHourAgo) || itemDetails.status !== 'in-shop') { //if already added to basket by someone else with the hour
      confirm({
        className: "modalStyle",
        title: `Sorry! This item has been shopped.`
      });
      history.push(`/`);
      return;
    }

    updateItem(itemId, {'inBasket': true, 'statusUpdateDates.inBasketDate': getDate()}, token);
    //update basket date for each item in basket
    if (basket && basket.length) {
      basket.forEach(b => {
        updateItem(b._id, {'inBasket': true, 'statusUpdateDates.inBasketDate': getDate()}, token);
      });
    }

    setBasket((basket && basket.length)? basket.concat([itemDetails]): [itemDetails]);

    // set up timer for resetting the basket - to expire 
    basketReset(itemDetails);

    confirm({
      title: `Item added to basket.`,
      className: "modalStyle",
      onOk() { history.push('/basket');},
      okText: 'View Basket',
      onCancel() {history.push(`/products`);},
      cancelText: 'Continue Shopping'
    });
  }

  return (
    <Container>
      <CategoryBreadcrumbs category={itemDetails.category} subCategory={itemDetails.subCategory} />
      <ItemWrapper>
        <ImageGallery changeMainImage={changeMainImage} mainImage={mainImage} otherImages={otherImages} />
        <ItemDetailsWrapper>
          <h1>{itemDetails.name}</h1>
          <p>{itemDetails.description || ''}</p>
          <p>Colour: {colours()}</p>
          <p>Brand: {itemDetails.brand || ''}</p>
          <p>Size: {size()} <a target="_blank" rel="noreferrer" href="https://www.calculator.com.my/shoe-clothing-size">size guide</a></p>
          <DonorLink to={'/donorproducts/' + itemDetails.donorId}>See other items by this donor</DonorLink>
          {itemDetails.status === 'in-shop' && <Button primary left small onClick={() => {addToBasket(itemDetails._id)}}>Add to Basket</Button>}
        </ItemDetailsWrapper>
      </ItemWrapper>
    </Container>
  );
};
