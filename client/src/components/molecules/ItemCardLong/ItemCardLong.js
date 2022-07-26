import React, { useState, useContext } from "react";
import { AppContext } from '../../../context/app-context';
import { useHistory } from 'react-router-dom';
import { CardLong, CardLongImage, ExpandLink, ExpandedAddress } from './ItemCardLong.styles';
import { Card as AntCard } from 'antd';
import { Button } from '../../atoms';
import { getLocation } from '../../../services/locations';
import { getUser } from '../../../services/user';
import { ProgressBar } from '../../atoms/ProgressBar/ProgressBar';
import { trunc, name } from '../../../utils/helpers';

const { Meta } = AntCard;

export const ItemCardLong = ({ item, actionText, action, type, shippedDate }) => {
  const { token } = useContext(AppContext);
  let history = useHistory();
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [addressFound, setAddressFound] = useState(false);
  let image = '';
  if (item.photos.length) {
    image = item.photos.filter(i => i.front === true)[0].url.replace('http://', 'https://')
  }

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
    e.stopPropagation();
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

  return (
      //some of the olf cloudinary images are not secure urls so forcing the change here
    <CardLong
    hoverable
    onClick={() => history.push(`/item/${item._id}`)}
      cover={
        <CardLongImage alt={`front of ${item.name}`} src={image} width='200' />
      }
    >
      <Meta bordered={'false'}
        title={item.name}
        description={trunc(item.description)}
      />
      {/* show progress bar depending on type of user logged in */}
      {(type)? <ProgressBar type={type} status={item.status} />: ''}
   
      {/* show item shipped date */}
      {(shippedDate)? <span>{'Shipped on: ' +  shippedDate}</span>: ''}

      {/* If donor logged in then show expandable view delivery address button */}
      {(type === 'donor' && !Object.keys(deliveryAddress).length && !addressFound)? <ExpandLink onClick={handleViewAddress}>View delivery address</ExpandLink>: ''}
      {(type === 'donor' && Object.keys(deliveryAddress).length)? getDeliveryAddress(): ''}
      {(type === 'donor' && addressFound)? <ExpandedAddress>No user found</ExpandedAddress>: ''}

        {/* if item action passed into component then add a button for it */}
      {actionText && <Button primary small onClick={(e) => {e.stopPropagation();action(item._id);}}>{actionText}</Button>}
    </CardLong>
  );
};
