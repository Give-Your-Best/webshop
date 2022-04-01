import React, { useContext, useState } from "react";
import { AppContext } from '../../../../context/app-context';
import { StyledTab, StyledTabList, StyledTabs, StyledTabPanel } from './ApproveRequests.styles';
import { getUsers, updateDonor, updateUser, getDonations } from '../../../../services/user';
import { updateItem } from '../../../../services/items';
import { ShopperMiniEditForm, DonorMiniEditForm, ApproveItemList, UsersList, ItemCardLong } from "../../../molecules";
import { Button } from '../../../atoms';
import { Formik } from 'formik';

export const ApproveRequests = () => {
    const { token } = useContext(AppContext);
    const [shoppers, setShoppers] = useState([]);
    const [donors, setDonors] = useState([]);
    const [donations, setDonations] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

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

    const itemExpand = (record) => {
      const approve = (e) => {
        const itemId = e.target.getAttribute('data-item-id');
        updateItem(itemId, {"approvedStatus": "approved"})
        .then(() => {
          record.donationItems = record.donationItems.filter(item => {
            return item._id !== itemId
          });
          setDonations(donations.filter(donation => {
            if (donation._id !== record._id) {
              return record
            } else {
              return donation
            }
          }));
        })
      }
      const reject = (e) => {
        const itemId = e.target.getAttribute('data-item-id');
        updateItem(itemId, {"approvedStatus": "rejected"})
        .then(() => {
          record.donationItems = record.donationItems.filter(item => {
            return item._id !== itemId
          });
          setDonations(donations.filter(donation => {
            if (donation._id !== record._id) {
              return record
            } else {
              return donation
            }
          }));
        })
      }

      return (
        <div>
        {record.donationItems.map((item) => (
          <div key={item._id}><ItemCardLong item={item} /><Button small data-item-id={item._id} onClick={approve}>Approve</Button><Button small data-item-id={item._id} onClick={reject}>Reject</Button></div>
        ))}
        </div>
      )      
    };

    const markAsTrusted = (recordIds) => {
      console.log('mark as trused')
      console.log(recordIds)
      recordIds.forEach((recordId) => {
        updateDonorWrapper(recordId, {"trustedDonor": true})
        .then(() => {
          setDonations(donations.filter(donation => {
            return donation._id !== recordId;
          }));
        })
      })
    }

    const editForm = (record) => {
        console.log('edt')
        console.log(record)

        const handleSubmit = (record) => {
            if (record.kind === 'shopper') {
                setShoppers(shoppers.filter(shopper => {
                  return shopper._id !== record._id;
                }));
            } else if (record.kind === 'donor') {
                setDonors(donors.filter(donor => {
                    return donor._id !== record._id;
                }));
            }
        }

        const updateRecord = async (values, action) => {
            const res = await updateUserWrapper(record._id, values, token);
            if (res.success) {
              return true;
            } else {
              setErrorMessage(res.message);
            }
        };

        const approvalAction = (e) => {
          const action = e.target.getAttribute('data-action');
          let values = {}
          switch (action) {
            case 'approve':
                values = {'approvedStatus': 'approved'}
                break;
            case 'reject':
                values = {'approvedStatus': 'rejected'}  
                break;
            default:
                break;
          }
          updateRecord(values, action);
        };
        return (
          <div>
            <Formik
            initialValues={record}
            onSubmit={handleSubmit}
            >
                { record.kind === 'donor'
                  ? <DonorMiniEditForm recordId={record._id} approvalAction={approvalAction} />
                  : ( record.kind === 'shopper' 
                    ? <ShopperMiniEditForm recordId={record._id} approvalAction={approvalAction} />
                    : ''
                  )
                } 
            </Formik> 
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  
          </div>
        )
      }

    React.useEffect(() => {

        const fetchShoppers = async () => {
          const users = await getUsers('shopper', 'in-progress', token);
          setShoppers(users);
        };
    
        const fetchDonors = async () => {
          const users = await getUsers('donor', 'in-progress', token);
          setDonors(users);
        };

        const fetchDonations = async () => {
          const donations = await getDonations('in-progress', token);
          console.log(donations)
          setDonations(donations);
        }
    
        fetchShoppers();
        fetchDonors();
        fetchDonations();
    
        return () => {
          // cleanup
        };
      }, [token]);

    return (
        <StyledTabs>
        <StyledTabList>
        <StyledTab>Shoppers</StyledTab>
        <StyledTab>Donors</StyledTab>
        <StyledTab>Items</StyledTab>
        </StyledTabList>

        <StyledTabPanel>
            <UsersList data={shoppers} expandRow={editForm} />
        </StyledTabPanel>
        <StyledTabPanel>
            <UsersList data={donors} expandRow={editForm} />
        </StyledTabPanel>
        <StyledTabPanel>
            <ApproveItemList data={donations} expandRow={itemExpand} markAsTrusted={markAsTrusted} />
        </StyledTabPanel>

    </StyledTabs>
    );
};
