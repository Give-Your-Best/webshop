import React, { useContext, useState, useEffect, useRef } from "react";
import { Formik } from 'formik';
import { AppContext } from '../../../../context/app-context';
import { UserEditForm, PasswordUpdate } from '../../../molecules';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab } from './UserDetails.styles';
import { getUsers, updateDonor, updateShopper } from '../../../../services/user';
import { donorCreateSchema, shopperCreateSchema, adminSchema } from '../../../../utils/validation';

export const UserDetails = () => {
  const { token, user, setUser } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const type = user.type;


  const updateCurrentUserWrapper = async (values) => {
    if (type === 'donor') {
      const res = await updateDonor(user.id, values, token);
      if (res.success) {
        setUser(user => ({
          ...user,
          'email': res.user.email,
          'firstName': res.user.firstName,
          'lastName': res.user.lastName
        }));
        return true;
      } else {
        setErrorMessage(res.message);
      }
    } else if ( type === 'shopper') {
      const res = await updateShopper(user.id, values, token);
      if (res.success) {
        setUser(user => ({
          ...user,
          'email': res.user.email,
          'firstName': res.user.firstName,
          'lastName': res.user.lastName,
          'deliveryAddress': res.user.deliveryAddress,
          'deliveryPreference': res.user.deliveryPreference
        }));
        return true;
      } else {
        setErrorMessage(res.message);
      }
    }
  };

  useEffect(() => {

    const fetchUsers = async () => {
      const users = await getUsers(type, 'approved', token);
      if (!mountedRef.current) return null;
      setUsers(users);
      setCurrentUser(users.find(d => {return d._id === user.id}));
    };

    fetchUsers();
    return () => {
      // cleanup
      mountedRef.current = false;
    };

  }, [token, user, type]);

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <StyledTabList>
        <StyledTab className='detaillist'>My Details</StyledTab>
        <HiddenStyledTab className='addpassword'>Update password</HiddenStyledTab>
      </StyledTabList>

      <StyledTabPanel>
      <Formik
        enableReinitialize={true}
        initialValues={currentUser}
        validationSchema={(type === 'donor')? donorCreateSchema: (type === 'shopper')? shopperCreateSchema: adminSchema}
        onSubmit={updateCurrentUserWrapper}
        >
          <UserEditForm type={user.type} users={users} errorMessage={errorMessage} />
        </Formik> 
      </StyledTabPanel>
      <StyledTabPanel>
        <PasswordUpdate email={user.email} id={user.id} />
      </StyledTabPanel>
    </StyledTabs>

  );
};
