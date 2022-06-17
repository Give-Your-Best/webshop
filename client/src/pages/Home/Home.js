import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from '../../context/app-context';
import { Button, ItemCard } from '../../components';
import { CategoriesCarousel} from '../../components/organisms';
import { getItems } from '../../services/items';
import { CoverWrapper, ItemsWrapper, CategoriesWrapper, H1, ButtonWrapper } from './Home.styles';
import logo from './website_cover.png';
import { subCategories } from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import { getSetting } from '../../services/settings';
import { sendMail } from '../../services/mail';
import { Notification } from '../../components/atoms';
import { emailTemplate } from '../../utils/helpers';
import { autoEmails } from '../../utils/constants';

export const Home = () => {
  const { token } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [shopItemLimit, setShopItemLimit] = useState(0);

  let history = useHistory();
  const mountedRef = useRef(true);

  const sendMailTest = async () => {
    const res = await sendMail({
      subject: autoEmails.filter((e) => {return e.type ==='account_declined'})[0].subject, 
      emailHTML: emailTemplate(autoEmails.filter((e) => {return e.type ==='account_declined'})[0].content.replace('{{name}}', 'Zahra Ali')),
      recipient: 'zahra@mailbox.org',
      recipientName: 'Zahra Ali'
    }, token);

    if (res.success) {
        Notification('Success!', 'Mail sent', 'success');
    } else {
        Notification('Error sending mail', res.message, 'error');
    }
    return
};

  useEffect(() => {

    const fetchItems = async () => {
      const items = await getItems(1, 8, 'approved', 'in-shop');
      if (!mountedRef.current) return null;
      setItems(items);
    };

    const fetchSetting = async () => {
      const settingValue = await getSetting('shopItemLimit');
      if (!mountedRef.current) return null;
      setShopItemLimit(settingValue);
    }

    fetchItems();
    fetchSetting();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div data-testid="HomeRoute">
        <CoverWrapper to="/">
          <h1>Give Your Best Shop</h1>
          <p>Browse items from 100s of besties</p>
          <p>shopping up to {shopItemLimit} items per week for free!</p>
          <img alt="give-your-best-cover" src={logo} />
        </CoverWrapper>
        <CategoriesWrapper>
          <h1>Browse Categories</h1>
          <CategoriesCarousel categories={subCategories.filter((c) => {return c.parentCategory ==='women' && c.image})} />
        </CategoriesWrapper>
          <H1>Women's Clothing</H1>
        <ItemsWrapper my={1} mx={-1} display="flex" flexWrap="wrap">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </ItemsWrapper>
      <ButtonWrapper>
        <Button center primary onClick={() => history.push(`/products/`)}>Browse All ></Button>
        <Button onClick={sendMailTest}>Send mail test</Button>
      </ButtonWrapper>
    </div>
  );
};