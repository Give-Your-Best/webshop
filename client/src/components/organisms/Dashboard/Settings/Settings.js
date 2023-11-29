import React, { useContext, useState, useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { Modal } from 'antd';
import { Form } from 'formik-antd';
import { AppContext } from '../../../../context/app-context';
import { AccountContext } from '../../../../context/account-context';
import {
  AdminEditForm,
  AdminMiniEditForm,
  PasswordUpdate,
  UsersList,
  AdminCreateForm,
  ShopSettingsEditForm,
  TagsList,
} from '../../../molecules';
import {
  StyledInput,
  StyledError,
  StyledSubmitButton,
} from '../../../molecules/EditForm/EditForm.styles';
import {
  StyledTab,
  StyledTabList,
  StyledTabs,
  StyledTabPanel,
  HiddenStyledTab,
} from './Settings.styles';
import { getUser, updateAdmin, deleteUser } from '../../../../services/user';
import { getRoles } from '../../../../services/roles';
import { getSettings } from '../../../../services/settings';
import { deleteTag, createTag, updateTag } from '../../../../services/tags';
import { Button } from '../../../atoms';
import { openHiddenTab, tabList } from '../../../../utils/helpers';
import { adminSchema, tagCreateSchema } from '../../../../utils/validation';

export const Settings = () => {
  const { token, user } = useContext(AppContext);
  const { allTags, setAllTags, allUsers, setAllUsers, currentUser } =
    useContext(AccountContext);

  const mountedRef = useRef(true);

  const [roles, setRoles] = useState([]);
  const [settings, setSettings] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [editingKey, setEditingKey] = useState([]);
  const [activeRecords, setActiveRecords] = useState({});

  const { confirm } = Modal;

  // TODO this belongs with the global helpers
  const updateContext = (data) => {
    const { firstName, lastName, email, kind, _id } = data;

    setAllUsers({
      ...allUsers,
      [_id]: {
        name: `${firstName} ${lastName}`.trim(),
        email: email,
        _id: _id,
        type: kind,
      },
    });
  };

  const addTag = async (values, { resetForm }) => {
    const res = await createTag(values, token);
    if (res.success && res.tag) {
      setAllTags(allTags.concat(res.tag));
      resetForm();
      return true;
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleDeleteTag = (id) => {
    confirm({
      title: `Are you sure you want to delete this tag?`,
      className: 'modalStyle',
      content: 'This will remove the tag and associated items from the tag',
      onOk() {
        deleteTag(id, token).then(() => {
          setAllTags(
            allTags.filter((t) => {
              return t._id !== id;
            })
          );
        });
      },
    });
  };

  const editTag = (record) => {
    const handleEditSave = (newRecord) => {
      setAllTags(
        allTags.map((tag) => {
          if (tag._id === newRecord._id) {
            return Object.assign(tag, newRecord);
          } else {
            return tag;
          }
        })
      );
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
      setEditingKey(editingKey ? '' : record._id);
    };

    return (
      <div>
        <Formik
          initialValues={record}
          onSubmit={handleSubmit}
          validationSchema={tagCreateSchema}
        >
          <Form>
            <StyledInput
              name="name"
              placeholder="Tag name"
              disabled={editingKey !== record._id}
            />
            <StyledError name="name" component="div" />

            {editingKey === record._id && (
              <StyledSubmitButton>Save</StyledSubmitButton>
            )}
          </Form>
        </Formik>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Button primary small type="reset" onClick={handleEdit}>
          {editingKey === record._id ? 'Cancel' : 'Edit'}
        </Button>
      </div>
    );
  };

  const handleDelete = (id) => {
    confirm({
      title: `Are you sure you want to delete this team member?`,
      className: 'modalStyle',
      content: 'This will remove the user',
      onOk() {
        deleteUser(id, token).then(() => {
          // eslint-disable-next-line no-unused-vars
          const { [id]: _discard, ...rest } = allUsers;
          setAllUsers(rest);
        });
      },
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

  const editForm = (user) => {
    const currentRecord = activeRecords[user._id];

    const templateForm = (
      <Formik initialValues={{}}>
        <AdminMiniEditForm editingKey={editingKey} />
      </Formik>
    );

    if (!currentRecord) {
      return templateForm;
    }

    if (user._id !== currentRecord._id) {
      return templateForm;
    }

    const handleSubmit = async (values) => {
      const res = await updateAdmin(currentRecord._id, values, token);

      if (res.success) {
        updateContext(res.user);
        setEditingKey('');
        return true;
      } else {
        setErrorMessage(res.message);
      }
    };

    const handleEdit = () => {
      setEditingKey(editingKey ? '' : currentRecord._id);
    };

    return (
      <div>
        <Formik initialValues={currentRecord} onSubmit={handleSubmit}>
          <AdminMiniEditForm
            recordId={currentRecord._id}
            editingKey={editingKey}
            roles={roles}
          />
        </Formik>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Button primary small type="reset" onClick={handleEdit}>
          {editingKey === currentRecord._id ? 'Cancel' : 'Edit'}
        </Button>
      </div>
    );
  };

  const handleExpand = (expanded, record) =>
    expanded &&
    getUser(record._id, token).then((u) =>
      setActiveRecords({
        ...activeRecords,
        [u._id]: u,
      })
    );

  useEffect(() => {
    const allAdmins = Object.values(allUsers || {}).filter(
      (u) => u.type === 'admin'
    );

    setAdminUsers(allAdmins);
  }, [allUsers]);

  useEffect(() => {
    //add to url history (added for back button to work)
    var tabs = tabList(user);
    tabs.forEach((t) => {
      if (t.id === 'adminSettings') {
        window.history.pushState({}, '', '/dashboard/' + t.id);
      }
    });

    if (mountedRef.current) {
      //currently unused
      getRoles(token).then(setRoles);
      //get overall site settings
      getSettings(token).then(setSettings);
    }

    return () => {
      mountedRef.current = false;
    };
  }, [token, user]);

  return (
    <StyledTabs forceRenderTabPanel={true}>
      <StyledTabList>
        <StyledTab className="detaillist">My Details</StyledTab>
        <HiddenStyledTab className="addpassword">
          Update password
        </HiddenStyledTab>
        <StyledTab className="teamlist">Team</StyledTab>
        <HiddenStyledTab className="addteam">Add Team</HiddenStyledTab>
        <StyledTab>Shop</StyledTab>
        <StyledTab>Tags</StyledTab>
      </StyledTabList>

      <StyledTabPanel>
        {/*User edit form */}
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
        {/* update password edit form hidden tab */}
        <PasswordUpdate email={user.email} id={user.id} />
      </StyledTabPanel>

      <StyledTabPanel>
        {/* Team list tab */}
        <UsersList
          data={adminUsers}
          handleDelete={handleDelete}
          expandRow={editForm}
          onExpand={handleExpand}
          allTags={allTags}
        />
        <Button
          primary
          small
          onClick={() => {
            openHiddenTab('team');
          }}
        >
          Create
        </Button>
      </StyledTabPanel>

      <StyledTabPanel>
        {/* team create hidden tab */}
        <AdminCreateForm submitFunction={updateContext} roles={roles} />
      </StyledTabPanel>

      <StyledTabPanel>
        {/*shop settings edit form */}
        <ShopSettingsEditForm settings={settings} />
      </StyledTabPanel>

      <StyledTabPanel>
        {/* tags list and create */}
        <TagsList
          data={allTags}
          handleDelete={handleDeleteTag}
          expandRow={editTag}
        />
        <Formik
          initialValues={{ name: '' }}
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
