import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { AppContext } from '../../context/app-context';
import { getItem } from '../../services/items';
import { ItemDetailsWrapper, ItemWrapper } from './Item.styles';
import { Container, ImageGallery, CategoryBreadcrumbs } from '../../components';
import { ColourCircles, Button }from '../../components/atoms';
import { useHistory } from 'react-router-dom';
import { getSetting } from '../../services/settings';

export const Item = () => {
  const { user, setBasket, basket, token } = useContext(AppContext);
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

  useEffect(() => {
    const fetchItemDetails = async () => {
      const itemDetails = await getItem(itemId);
      if (!mountedRef.current) return null;
      setItemDetails(itemDetails);
      setMainImage(itemDetails.photos[0]);

      if (itemDetails.photos.length > 1) {
        setOtherImages(itemDetails.photos.slice(1))
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

  const addToBasket = (itemId) => {
    const isShopped = basket && basket.some(i=>i._id === itemId);
    const cannotShop = ((user)? user.recentItems.length: 0) + ((basket)? basket.length: 0) >= limit;

    if (!user || user.type !== 'shopper') { //if not signed in
      confirm({
        title: `Please sign up as a shopper to shop!`
      });
      return;
    }

    if (isShopped) { //if alerady in basket
      confirm({
        title: `This item is already in your basket`
      });
      return;
    }

    if (cannotShop) { //if limit reached
      confirm({
        title: `You have reached your weekly shopping limit!`,
        content: 'Please check your current orders on your account profile.'
      });
      return;
    }

    setBasket((basket && basket.length)? basket.concat([itemDetails]): [itemDetails]);

    confirm({
      title: `Item added to basket.`,
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
          <p>Size: {size()}</p>
          <Button primary left small onClick={() => {addToBasket(itemDetails._id)}}>Add to Basket</Button>
        </ItemDetailsWrapper>
      </ItemWrapper>
    </Container>
  );
};
