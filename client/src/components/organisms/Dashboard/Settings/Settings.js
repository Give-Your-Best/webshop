import React, { useContext, useState, useEffect, useRef } from "react";
import { Formik } from 'formik';
import { Modal } from 'antd';
import { Form } from 'formik-antd';
import { AppContext } from '../../../../context/app-context';
import { AdminEditForm, AdminMiniEditForm, PasswordUpdate, UsersList, AdminCreateForm, ShopSettingsEditForm, TagsList} from '../../../molecules';
import { StyledInput, StyledError, StyledSubmitButton } from "../../../molecules/EditForm/EditForm.styles";
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel, HiddenStyledTab } from './Settings.styles';
import { getUsers, updateAdmin, deleteUser } from '../../../../services/user';
import { getRoles } from '../../../../services/roles';
import { getSettings } from '../../../../services/settings';
import { getTags, deleteTag, createTag, updateTag } from '../../../../services/tags';
import { Button } from '../../../atoms';
import { openHiddenTab, tabList } from "../../../../utils/helpers";
import { adminSchema, tagCreateSchema } from "../../../../utils/validation";

export const Settings = () => {
  const { token, user } = useContext(AppContext);
  const mountedRef = useRef(true);
  const [currentUser, setCurrentUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [settings, setSettings] = useState([]);
  const [tags, setTags] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [editingKey, setEditingKey] = useState([]);

  const { confirm } = Modal;

  //tag functions
  const addTag = async (values, {resetForm}) => {
    const res = await createTag(values, token);
    if (res.success && res.tag) {
      setTags(tags.concat(res.tag));
      resetForm();
      return true;
    } else {
      setErrorMessage(res.message);
    }
  }

  const handleDeleteTag = (id) => {
    confirm({
      title: `Are you sure you want to delete this tag?`,
      className: "modalStyle",
      content: 'This will remove the tag and associated items from the tag',
      onOk() {
        deleteTag(id, token)
        .then(() => {
            setTags(tags.filter(t => {
              return t._id !== id;
            }));
        });
      }
    });
  };

  const editTag = (record) => {
    const handleEditSave = (newRecord) => {
        setTags(tags.map(tag => {
          if (tag._id === newRecord._id) {
            return Object.assign(tag, newRecord);
          } else { 
            return tag
          }
        }));
    };
    
    const handleSubmit = async (values) => {
      const res = await updateTag(record._id, values, token);
      if (res.success) {
        handleEditSave(res.tag);
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
        validationSchema={tagCreateSchema}
        >
        <Form>
            <StyledInput name="name" placeholder="Tag name" disabled={editingKey !== record._id} />
            <StyledError name="name" component="div" />

            {editingKey === record._id &&<StyledSubmitButton>Save</StyledSubmitButton>} 
        </Form>
        </Formik> 
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  
        <Button primary small type="reset" onClick={handleEdit}>{editingKey === record._id ? 'Cancel' : 'Edit'}</Button>
      </div>
    )      
  };

  //admin user functions
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

  useEffect(() => {

    //add to url history (added for back button to work)
    var tabs = tabList(user);
    tabs.forEach((t) => {
      if (t.id === 'adminSettings') {
        window.history.pushState({}, '','/dashboard/' + t.id)
      }
    })

    //currently unused
    const fetchRoles = async () => {
      const roles = await getRoles(token);
      if (!mountedRef.current) return null;
      setRoles(roles);
    };

    //get overall site settings
    const fetchSettings = async () => {
      const settings = await getSettings(token);
      if (!mountedRef.current) return null;
      setSettings(settings);
    }

    //get list of all tags in the system
    const fetchAllTags = async () => {
      const tags = await getTags(token);
      if (!mountedRef.current) return null;
      setTags(tags);
    }

    //list of admin users 
    const fetchAdminUsers = async () => {
      const users = await getUsers('admin', 'approved', token);
      if (!mountedRef.current) return null;
      setAdminUsers(users);
      setCurrentUser(users.find(adminUser => {return adminUser._id === user.id}));
    };

    fetchRoles();
    fetchAdminUsers();
    fetchSettings();
    fetchAllTags();

    return () => {
      // cleanup
      mountedRef.current = false;
    };

  }, [token, user]);

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <StyledTabList>
        <StyledTab className='detaillist'>My Details</StyledTab>
        <HiddenStyledTab className='addpassword'>Update password</HiddenStyledTab>
        <StyledTab className='teamlist'>Team</StyledTab>
        <HiddenStyledTab className='addteam'>Add Team</HiddenStyledTab>
        <StyledTab>Shop</StyledTab>
        <StyledTab>Tags</StyledTab>
      </StyledTabList>

      <StyledTabPanel>  {/*User edit form */}
      <Formik
        enableReinitialize={true}
        initialValues={currentUser}
        validationSchema={adminSchema}
        onSubmit={updateCurrentUserWrapper}
        >
          <AdminEditForm roles={roles} />
        </Formik> 
      </StyledTabPanel>

      <StyledTabPanel> {/* update password edit form hidden tab */}
        <PasswordUpdate email={user.email} id={user.id} />
      </StyledTabPanel>

      <StyledTabPanel> {/* Team list tab */}
        <UsersList data={adminUsers} handleDelete={handleDelete} expandRow={editForm} />
        <Button primary small onClick={() => {openHiddenTab('team')}}>Create</Button>
      </StyledTabPanel>

      <StyledTabPanel>  {/* team create hidden tab */}
        <AdminCreateForm submitFunction={submitFunction} roles={roles} />
      </StyledTabPanel>

      <StyledTabPanel>  {/*shop settings edit form */}
        <ShopSettingsEditForm settings={settings} />
      </StyledTabPanel>

      <StyledTabPanel>  {/* tags list and create */}
        <TagsList data={tags} handleDelete={handleDeleteTag} expandRow={editTag} />
        <Formik
          initialValues={{'name': ''}}
          onSubmit={addTag}
          validationSchema={tagCreateSchema}
          >
        <Form>
            <StyledInput name="name" placeholder="Tag name" />
            <StyledError name="name" component="div" />

            <StyledSubmitButton>Add New</StyledSubmitButton>
        </Form>
        </Formik> 
      </StyledTabPanel>

    </StyledTabs>

  );
};
