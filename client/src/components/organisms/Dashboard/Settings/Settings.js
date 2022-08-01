import React, { useContext, useState, useEffect, useRef } from "react";
import { Formik } from 'formik';
import { Modal } from 'antd';
import { AppContext } from '../../../../context/app-context';
import { AdminEditForm, AdminMiniEditForm, PasswordUpdate, UsersList, AdminCreateForm, ShopSettingsEditForm } from '../../../molecules';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab } from './Settings.styles';
import { getUsers, updateAdmin, deleteUser } from '../../../../services/user';
import { getRoles } from '../../../../services/roles';
import { getSettings } from '../../../../services/settings';
// import { getTags } from '../../../../services/tags';
import { Button } from '../../../atoms';
import { openHiddenTab, tabList } from "../../../../utils/helpers";
import { adminSchema } from "../../../../utils/validation";

export const Settings = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [currentUser, setCurrentUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [settings, setSettings] = useState([]);
  // const [tags, setTags] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [editingKey, setEditingKey] = useState([]);

  const { confirm } = Modal;

  const handleDelete = (id) => {
    confirm({
      title: `Are you sure you want to delete this team member?`,
      className: "modalStyle",
      content: 'This will remove the user',
      onOk() {
        deleteUser(id, token)
        .then(() => {
            setAdminUsers(adminUsers.filter(user => {
              return user._id !== id;
            }));
        });
      }
    });
  };


  const updateCurrentUserWrapper = async (values) => {
    const res = await updateAdmin(user.id, values, token);
    if (res.success) {
      return true;
    } else {
      setErrorMessage(res.message);
    }
  };

  useEffect(() => {

    //add to url history (added for back button to work)
    var tabs = tabList(user);
    tabs.forEach((t) => {
      if (t.id === 'adminSettings') {
        window.history.pushState({}, '','/dashboard/' + t.id)
      }
    })

    const fetchRoles = async () => {
      const roles = await getRoles(token);
      if (!mountedRef.current) return null;
      setRoles(roles);
    };

    const fetchSettings = async () => {
      const settings = await getSettings(token);
      if (!mountedRef.current) return null;
      setSettings(settings);
    }

    // const fetchAllTags = async () => {
    //   const tags = await getTags(token);
    //   if (!mountedRef.current) return null;
    //   setTags(tags);
    // }

    const fetchAdminUsers = async () => {
      const users = await getUsers('admin', 'approved', token);
      if (!mountedRef.current) return null;
      setAdminUsers(users);
      setCurrentUser(users.find(adminUser => {return adminUser._id === user.id}));
    };

    fetchRoles();
    fetchAdminUsers();
    fetchSettings();
    // fetchAllTags();

    return () => {
      // cleanup
      mountedRef.current = false;
    };

  }, [token, user]);

  // const viewRole = (role) => {
  //   return (
  //     <div>
  //     {permissions.map((d)=>{
  //       return (<><input type="checkbox" name={d} disabled checked={checkPermission(role.permissions, d)? true: false}/><label> {d} </label></>);
  //     })}
  //     </div>
  //   )
  // }

  const editForm = (record) => {
    const handleEditSave = (newRecord) => {
        setAdminUsers(adminUsers.map(adminUser => {
          if (adminUser._id === newRecord._id) {
            return Object.assign(adminUser, newRecord);
          } else { 
            return adminUser
          }
        }));
    };
    
    const handleSubmit = async (values) => {
      const res = await updateAdmin(record._id, values, token);
      if (res.success) {
        handleEditSave(res.user);
        setEditingKey('');
        return true;
      } else {
        setErrorMessage(res.message);
      }
    };

    const handleEdit = () => {
      setEditingKey((editingKey)? '': record._id)
    }

    return (
      <div>
        <Formik
        initialValues={record}
        onSubmit={handleSubmit}
        >
          <AdminMiniEditForm recordId={record._id} editingKey={editingKey} roles={roles} />
        </Formik> 
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  
        <Button primary small type="reset" onClick={handleEdit}>{editingKey === record._id ? 'Cancel' : 'Edit'}</Button>
      </div>
    )      
  };
  const submitFunction = (adminUser) => {
    setAdminUsers(adminUsers.concat(adminUser));
  }

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <StyledTabList>
        <StyledTab className='detaillist'>My Details</StyledTab>
        <HiddenStyledTab className='addpassword'>Update password</HiddenStyledTab>
        <StyledTab className='teamlist'>Team</StyledTab>
        <HiddenStyledTab className='addteam'>Add Team</HiddenStyledTab>
        <StyledTab>Shop</StyledTab>
        {/* <StyledTab>Tags</StyledTab> */}
      </StyledTabList>

      <StyledTabPanel>
      <Formik
        enableReinitialize={true}
        initialValues={currentUser}
        validationSchema={adminSchema}
        onSubmit={updateCurrentUserWrapper}
        >
          <AdminEditForm roles={roles} />
        </Formik> 
      </StyledTabPanel>
      <StyledTabPanel>
        <PasswordUpdate email={user.email} id={user.id} />
      </StyledTabPanel>
      <StyledTabPanel>
        <UsersList data={adminUsers} handleDelete={handleDelete} expandRow={editForm} />
        <Button primary small onClick={() => {openHiddenTab('team')}}>Create</Button>
      </StyledTabPanel>
      <StyledTabPanel>
        <AdminCreateForm submitFunction={submitFunction} roles={roles} />
      </StyledTabPanel>
      <StyledTabPanel>
        <ShopSettingsEditForm settings={settings} />
      </StyledTabPanel>
      {/* <StyledTabPanel>
        {(tags.length)?
          tags.map((t)=>{
            return (<div key={t._id} value={t._id}>{t.name}</div>);
            })
          : ''
        }
        <Button primary small onClick={() => {console.log('ef')}}>Add New</Button>
      </StyledTabPanel> */}

    </StyledTabs>

  );
};
