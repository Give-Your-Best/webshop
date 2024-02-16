import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../../context/app-context';
import { useHistory } from 'react-router-dom';
import {
  CardLong,
  CardLongImage,
  ExpandLink,
  ExpandedAddress,
  MoreInfoButton,
} from './ItemCardLong.styles';
import { Card as AntCard, Modal } from 'antd';
import { Button } from '../../atoms';
import { getLocation } from '../../../services/locations';
import { getUser } from '../../../services/user';
import { ProgressBar } from '../../atoms/ProgressBar/ProgressBar';
import { Tags } from '../../organisms';
import {
  trunc,
  name,
  getFrontImageUrl,
  getItemDetails,
  getItemShopperAndDonorDetails,
} from '../../../utils/helpers';

const { Meta } = AntCard;

export const ItemCardLong = ({ item, actionText, action, type, allTags }) => {
  const { token } = useContext(AppContext);
  let history = useHistory();
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [addressFound, setAddressFound] = useState(false);
  const [FAOshopperName, setFAOShopperName] = useState('');
  const [displaySizes, setDisplaySizes] = useState([]);

  useEffect(() => {
    if (item.shoeSize && item.shoeSize.length > 0) {
      setDisplaySizes(item.shoeSize);
    } else if (item.clothingSize && item.clothingSize.length > 0) {
      setDisplaySizes(item.clothingSize);
    }
  }, [item.shoeSize, item.clothingSize]);

  const additionalItemDetails =
    type === 'all' || type === 'admin' ? getItemDetails(item) : false;
  const itemShopperAndDonorDetails =
    type === 'all' || type === 'admin'
      ? getItemShopperAndDonorDetails(item)
      : false;

  const info = () => {
    Modal.info({
      title: 'Item Info',
      content: (
        <div dangerouslySetInnerHTML={{ __html: additionalItemDetails }}></div>
      ),
      okText: 'Close',
      icon: '',
      onOk() {},
      className: 'modalStyle',
    });
  };

  const getDeliveryAddress = () => {
    return (
      <>
        {FAOshopperName ? (
          <ExpandedAddress>FAO {FAOshopperName}</ExpandedAddress>
        ) : (
          ''
        )}
        <ExpandedAddress>{deliveryAddress.name}</ExpandedAddress>
        <ExpandedAddress>
          {deliveryAddress.firstLine +
            (deliveryAddress.secondLine && deliveryAddress.secondLine !== ''
              ? ', ' + deliveryAddress.secondLine
              : '')}
        </ExpandedAddress>
        <ExpandedAddress>
          {deliveryAddress.city
            ? deliveryAddress.city + ', ' + deliveryAddress.postcode
            : deliveryAddress.postcode}
        </ExpandedAddress>
      </>
    );
  };

  const handleViewAddress = async () => {
    var shopper = {};

    if (typeof item.shopperId === 'string') {
      shopper = await getUser(item.shopperId, token);
    } else {
      shopper = item.shopperId;
    }

    if (shopper.deliveryPreference === 'via-gyb' && item.sendVia) {
      const location = await getLocation(item.sendVia, token);
      setFAOShopperName(name(shopper));
      setDeliveryAddress(location[0]);
    } else if (
      shopper.deliveryPreference !== 'via-gyb' &&
      shopper.deliveryAddress
    ) {
      shopper.deliveryAddress.name = name(shopper);
      setDeliveryAddress(shopper.deliveryAddress);
    } else {
      setAddressFound(true);
    }
  };

  return (
    //some of the olf cloudinary images are not secure urls so forcing the change here
    <CardLong
      cover={
        <CardLongImage
          alt={`front of ${item.name}`}
          src={getFrontImageUrl(item.photos)}
          width="200"
        />
      }
    >
      <Meta
        bordered={'false'}
        title={item.name}
        description={
          <>
            {trunc(item.description)}
            {displaySizes.length > 0 && (
              <>
                <br />
                size {displaySizes.join(', ')}
              </>
            )}
          </>
        }
        onClick={() => history.push(`/item/${item._id}`)}
      />
      {/* show progress bar depending on type of user logged in */}
      {type ? <ProgressBar type={type} status={item.status} /> : ''}

      {type === 'all' || type === 'admin' ? (
        <div
          dangerouslySetInnerHTML={{ __html: itemShopperAndDonorDetails }}
        ></div>
      ) : (
        ''
      )}

      {type === 'all' || type === 'admin' ? (
        <MoreInfoButton onClick={info}>View item info</MoreInfoButton>
      ) : (
        ''
      )}

      {/* If donor logged in then show expandable view delivery address button */}
      {type === 'donor' &&
      !Object.keys(deliveryAddress).length &&
      !addressFound ? (
        <ExpandLink onClick={handleViewAddress}>
          View delivery address
        </ExpandLink>
      ) : (
        ''
      )}
      {type === 'donor' && Object.keys(deliveryAddress).length
        ? getDeliveryAddress()
        : ''}
      {type === 'donor' && addressFound ? (
        <ExpandedAddress>Address not yet assigned</ExpandedAddress>
      ) : (
        ''
      )}

      {type === 'all' ? (
        <Tags
          updateId={item._id}
          tagList={item.tags || []}
          availableTags={allTags}
          updateType="item"
        />
      ) : (
        ''
      )}

      {/* if item action passed into component then add a button for it */}
      {actionText && (
        <Button
          primary
          small
          onClick={(e) => {
            e.stopPropagation();
            action(item._id);
          }}
        >
          {actionText}
        </Button>
      )}
    </CardLong>
  );
};
