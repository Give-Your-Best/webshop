import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../../../../context/app-context';
import { AccountContext } from '../../../../context/account-context';
import {
  StyledTab,
  StyledTabList,
  StyledTabs,
  StyledTabPanel,
  ItemBox,
} from './ApproveRequests.styles';
import {
  getUsers,
  updateDonor,
  updateUser,
  getDonations,
} from '../../../../services/user';
import { updateItem } from '../../../../services/items';
// import { getSetting } from '../../../../services/settings';
import { sendAutoEmail, tabList } from '../../../../utils/helpers';
import {
  ShopperMiniEditForm,
  DonorMiniEditForm,
  ApproveItemList,
  UsersList,
  ItemCardLong,
} from '../../../molecules';
import { Button } from '../../../atoms';
import { Formik } from 'formik';

export const ApproveRequests = () => {
  const { token, user } = useContext(AppContext);
  const { allTags } = useContext(AccountContext);
  const mountedRef = useRef(true);
  const [shoppers, setShoppers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [approvedItemCount, setApprovedItemCount] = useState(0);

  const updateDonorWrapper = async (recordId, values) => {
    const res = await updateDonor(recordId, values, token);
    if (res.success) {
      return true;
    } else {
      setErrorMessage(res.message);
    }
  };

  const updateUserWrapper = async (recordId, values) => {
    const res = await updateUser(recordId, values, token);
    if (res.success) {
      return true;
    } else {
      setErrorMessage(res.message);
    }
  };

  //items approval

  const itemExpand = (record) => {
    const approve = (e) => {
      //TO DO Email Notification to say your donation has been approved
      const itemId = e.target.getAttribute('data-item-id');
      updateItem(itemId, { approvedStatus: 'approved' }).then(() => {
        setApprovedItemCount(approvedItemCount + 1);

        record.donationItems = record.donationItems.filter((item) => {
          return item._id !== itemId;
        });

        setDonations(
          donations.filter((donation) => {
            if (donation._id !== record._id) {
              return record;
            } else {
              return donation;
            }
          })
        );
      });
    };
    const reject = (e) => {
      //TO DO Email Notification to say your donation has been rejected
      const itemId = e.target.getAttribute('data-item-id');
      updateItem(itemId, { approvedStatus: 'rejected' }).then(() => {
        record.donationItems = record.donationItems.filter((item) => {
          return item._id !== itemId;
        });
        setDonations(
          donations.filter((donation) => {
            if (donation._id !== record._id) {
              return record;
            } else {
              return donation;
            }
          })
        );
      });
    };

    return (
      <div>
        {record.donationItems.map((item) => (
          <ItemBox key={item._id}>
            <ItemCardLong item={item} allTags={allTags} />
            <Button primary small data-item-id={item._id} onClick={approve}>
              Approve
            </Button>
            <Button small primary data-item-id={item._id} onClick={reject}>
              Reject
            </Button>
          </ItemBox>
        ))}
      </div>
    );
  };

  const markAsTrusted = (recordIds) => {
    recordIds.forEach((recordId) => {
      updateDonorWrapper(recordId, { trustedDonor: true }).then(() => {
        setDonations(
          donations.filter((donation) => {
            return donation._id !== recordId;
          })
        );
      });
    });
  };

  //user approval
  const editForm = (record) => {
    const handleSubmit = (record) => {
      if (record.kind === 'shopper') {
        setShoppers(
          shoppers.filter((shopper) => {
            return shopper._id !== record._id;
          })
        );
      }
    };

    const updateRecord = async (values) => {
      const res = await updateUserWrapper(record._id, values, token);
      if (res.success) {
        return true;
      } else {
        setErrorMessage(res.message);
      }
    };

    const approvalAction = (e) => {
      const action = e.target.getAttribute('data-action');
      switch (action) {
        case 'approve':
          updateRecord({ approvedStatus: 'approved' }, action);
          sendAutoEmail('account_approved', record);
          break;
        case 'reject':
          updateRecord({ approvedStatus: 'rejected' }, action);
          sendAutoEmail('account_declined', record);
          break;
        default:
          break;
      }
    };
    return (
      <div>
        <Formik initialValues={record} onSubmit={handleSubmit}>
          {record.kind === 'donor' ? (
            <DonorMiniEditForm
              recordId={record._id}
              approvalAction={approvalAction}
            />
          ) : record.kind === 'shopper' ? (
            <ShopperMiniEditForm
              recordId={record._id}
              approvalAction={approvalAction}
            />
          ) : (
            ''
          )}
        </Formik>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
  };

  useEffect(() => {
    //add to url history (added for back button to work)
    var tabs = tabList(user);
    tabs.forEach((t) => {
      if (t.id === 'adminApprove') {
        window.history.pushState({}, '', '/dashboard/' + t.id);
      }
    });

    const fetchShoppers = async () => {
      const users = await getUsers('shopper', 'in-progress', token);
      setShoppers(users);
    };

    const fetchDonations = async () => {
      const donations = await getDonations('in-progress', token);
      setDonations(
        donations.filter((item) => {
          return item.numOfDonationItems !== 0;
        })
      );
    };

    if (mountedRef.current) {
      fetchShoppers();
      fetchDonations();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [token, user]);

  return (
    <StyledTabs>
      <StyledTabList>
        <StyledTab>Shoppers</StyledTab>
        <StyledTab>Items</StyledTab>
      </StyledTabList>

      <StyledTabPanel>
        <UsersList data={shoppers} expandRow={editForm} />
      </StyledTabPanel>
      <StyledTabPanel>
        <ApproveItemList
          data={donations}
          expandRow={itemExpand}
          markAsTrusted={markAsTrusted}
        />
      </StyledTabPanel>
    </StyledTabs>
  );
};
