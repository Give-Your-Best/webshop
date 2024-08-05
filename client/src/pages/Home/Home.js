import React, { useState, useEffect, useRef } from 'react';
import { Button, ItemCard } from '../../components';
import { CategoriesCarousel } from '../../components/organisms';
import { getItems } from '../../services/items';
import {
  CoverWrapper,
  ItemsWrapper,
  CategoriesWrapper,
  H1,
  ButtonWrapper,
} from './Home.styles';
import logo from './website_cover.png';
import { subCategories } from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import { getSetting } from '../../services/settings';

// import { CloseCircleOutlined } from '@ant-design/icons';
import { Result, Typography } from 'antd';
const { Paragraph, Text } = Typography;

export const Home = () => {
  const [items, setItems] = useState([]);
  const [shopItemLimit, setShopItemLimit] = useState(0);

  let history = useHistory();
  const mountedRef = useRef(true);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems(1, 8, 'approved', 'in-shop');
      if (!mountedRef.current) return null;
      if (items) setItems(items);
    };

    const fetchSetting = async () => {
      const settingValue = await getSetting('shopItemLimit');
      if (!mountedRef.current) return null;
      setShopItemLimit(settingValue);
    };

    fetchItems();
    fetchSetting();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div>
      {true && (
        <Result status="warning" title="Operations paused">
          <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 18,
                }}
              >
                {'To our community: '}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                {
                  'now more than ever we want you to know you are welcomed, supported and valued. If you need support please email safeguarding@giveyourbest.uk'
                }
              </Text>
            </Paragraph>
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 18,
                }}
              >
                {'To our donors: '}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                {
                  "thank you for being here, you support means everything, let's keep each other safe."
                }
              </Text>
            </Paragraph>
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 18,
                }}
              >
                {'Love and solidarity, '}
              </Text>
              <br />
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                {'the Give Your Best team '}
              </Text>
            </Paragraph>
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 18,
                }}
              >
                {
                  'Ps. In the meantime, if you would like to support our work please donate '
                }
                <a href="https://cafdonate.cafonline.org/20703#!/DonationDetails">
                  here
                </a>
              </Text>
            </Paragraph>
          </div>
        </Result>
      )}

      <CoverWrapper to="/">
        <h1>Give Your Best Shop</h1>
        <p>Browse our catalogue of gifted items and</p>
        <p>shop up to {shopItemLimit} items per week for free!</p>
        <img alt="give-your-best-cover" src={logo} />
      </CoverWrapper>

      {false && (
        <>
          <CategoriesWrapper>
            <h1>Browse Categories</h1>
            <CategoriesCarousel
              categories={subCategories.filter((c) => {
                return c.parentCategory === 'women' && c.image;
              })}
            />
          </CategoriesWrapper>
          <H1>All Items</H1>
          <ItemsWrapper my={1} mx={-1} display="flex" flexWrap="wrap">
            {items.length
              ? items.map((item) => {
                  if (item.photos.length) {
                    return <ItemCard key={item._id} item={item} />;
                  } else {
                    return '';
                  }
                })
              : ''}
          </ItemsWrapper>
          <ButtonWrapper>
            <Button center primary onClick={() => history.push(`/products/`)}>
              {'Browse All >'}
            </Button>
          </ButtonWrapper>
        </>
      )}
    </div>
  );
};
