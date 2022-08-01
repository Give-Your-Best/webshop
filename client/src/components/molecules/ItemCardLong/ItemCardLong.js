import React, { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from '../../../context/app-context';
import { useHistory } from 'react-router-dom';
import { CardLong, CardLongImage, ExpandLink, ExpandedAddress } from './ItemCardLong.styles';
import { Card as AntCard } from 'antd';
import { Button } from '../../atoms';
import { getLocation } from '../../../services/locations';
import { getUser } from '../../../services/user';
import { getTags } from '../../../services/tags';
import { ProgressBar } from '../../atoms/ProgressBar/ProgressBar';
// import { Tags } from "../../organisms";
import { trunc, name, getFrontImageUrl } from '../../../utils/helpers';

const { Meta } = AntCard;

export const ItemCardLong = ({ item, actionText, action, type, shippedDate, shoppedBy }) => {

  const { token } = useContext(AppContext);
  const mountedRef = useRef(true);
  let history = useHistory();
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [addressFound, setAddressFound] = useState(false);
  // const [allTags, setAllTags] = useState([]);

  const getDeliveryAddress = () => {
    return (
      <>
      <ExpandedAddress>{deliveryAddress.name}</ExpandedAddress>
      <ExpandedAddress>{deliveryAddress.firstLine + ((deliveryAddress.secondLine && deliveryAddress.secondLine !== '')? (', ' + deliveryAddress.secondLine): '')}</ExpandedAddress>
      <ExpandedAddress>{(deliveryAddress.city? deliveryAddress.city + ', ' + deliveryAddress.postcode: deliveryAddress.postcode)}</ExpandedAddress>
      </>
    )
  }

  const handleViewAddress = async (e) => {
    if (item.sendVia) {
      const location = await getLocation(item.sendVia, token);
      setDeliveryAddress(location[0])
    } else {
      const shopper = await getUser(item.shopperId, token);
      if (shopper.deliveryAddress) {
        shopper.deliveryAddress.name = name(shopper);
        setDeliveryAddress(shopper.deliveryAddress)
      } else {
        setAddressFound(true)
      }
    }

  };

  useEffect(() => {

    const fetchAllTags = async () => {
        //get all tags
        const tags = await getTags(token);
        if (!mountedRef.current) return null;
        // setAllTags(tags);
    };

    fetchAllTags();

    return () => {
      // cleanup
      mountedRef.current = false;
    };
// eslint-disable-next-line
}, [token]);

  return (
      //some of the olf cloudinary images are not secure urls so forcing the change here
    <CardLong
      cover={
        <CardLongImage alt={`front of ${item.name}`} src={getFrontImageUrl(item.photos)} width='200' />
      }
    >
      <Meta bordered={'false'}
        title={item.name}
        description={trunc(item.description)}
        onClick={() => history.push(`/item/${item._id}`)}
      />
      {/* show progress bar depending on type of user logged in */}
      {(type)? <ProgressBar type={type} status={item.status} />: ''}
   
      {(type === 'all' && shoppedBy)? <span>{'Shopped by: ' +  shoppedBy}<br /></span>: ''}

      {/* show item shipped date */}
      {(type === 'all' && shippedDate)? <span>{'Shipped on: ' +  shippedDate}</span>: ''}

      {/* If donor logged in then show expandable view delivery address button */}
      {(type === 'donor' && !Object.keys(deliveryAddress).length && !addressFound)? <ExpandLink onClick={handleViewAddress}>View delivery address</ExpandLink>: ''}
      {(type === 'donor' && Object.keys(deliveryAddress).length)? getDeliveryAddress(): ''}
      {(type === 'donor' && addressFound)? <ExpandedAddress>No user found</ExpandedAddress>: ''}
      {/* {(type === 'all')? <Tags tagList={['Tag 1', 'Tag 2', 'Tag 3']} availableTags={allTags}/>: ''} */}

        {/* if item action passed into component then add a button for it */}
      {actionText && <Button primary small onClick={(e) => {e.stopPropagation();action(item._id);}}>{actionText}</Button>}
    </CardLong>
  );
};
