import React, { useContext } from "react";
import { AppContext } from '../../../context/app-context';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel } from './Users.styles';
import { UsersList } from '../../molecules/UsersList';
import { getUsers, deleteUser } from '../../../services/user';
import { Modal } from 'antd';

export const Users = () => {
  const { confirm } = Modal;
  const { token } = useContext(AppContext);
  const [shoppers, setShoppers] = React.useState([]);
  const [donors, setDonors] = React.useState([]);

  const handleShopperDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this shopper?',
      content: 'This will remove the user',
      onOk() {
        deleteUser(id, token)
        .then(() => {
          setShoppers(shoppers.filter(shopper => {
            return shopper._id !== id;
          }));
        });
      }
    });
  };

  const handleDonorDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this donor?',
      content: 'This will remove the user',
      onOk() {
        deleteUser(id, token)
        .then(() => {
          setDonors(donors.filter(donor => {
            return donor._id !== id;
          }));
        });
      }
    });
  };

  React.useEffect(() => {

    const fetchShoppers = async () => {
      const users = await getUsers('shopper', token);
      setShoppers(users);
    };

    const fetchDonors = async () => {
      const users = await getUsers('donor', token);
      setDonors(users);
    };

    fetchShoppers();
    fetchDonors();
  }, [token]);
  
  return (
    <StyledTabs>
    <StyledTabList>
      <StyledTab>Shoppers</StyledTab>
      <StyledTab>Donors</StyledTab>
    </StyledTabList>

    <StyledTabPanel>
      <UsersList data={shoppers} handleDelete={handleShopperDelete} />
    </StyledTabPanel>
    <StyledTabPanel>
      <UsersList data={donors} handleDelete={handleDonorDelete} />
    </StyledTabPanel>

  </StyledTabs>
  );
};
