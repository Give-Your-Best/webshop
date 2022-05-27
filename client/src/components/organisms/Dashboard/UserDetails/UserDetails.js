import React, { useContext, useState, useEffect, useRef } from "react";
import { Formik } from 'formik';
import { AppContext } from '../../../../context/app-context';
import { UserEditForm, PasswordUpdate } from '../../../molecules';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab } from './UserDetails.styles';
import { getUsers, updateDonor, updateShopper } from '../../../../services/user';

export const UserDetails = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const type = user.type;

  const updateCurrentUserWrapper = async (values) => {
    if (type === 'donor') {
      const res = await updateDonor(user.id, values, token);
      if (res.success) {
        return true;
      } else {
        setErrorMessage(res.message);
      }
    } else if ( type === 'shopper') {
      const res = await updateShopper(user.id, values, token);
      if (res.success) {
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
        // validationSchema={adminSchema}
        onSubmit={updateCurrentUserWrapper}
        >
          <UserEditForm users={users} errorMessage={errorMessage} type={user.type} />
        </Formik> 
      </StyledTabPanel>
      <StyledTabPanel>
        <PasswordUpdate email={user.email} id={user.id} />
      </StyledTabPanel>
    </StyledTabs>

  );
};
