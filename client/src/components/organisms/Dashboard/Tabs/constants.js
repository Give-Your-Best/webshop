import { Statistics } from '../Statistics';
import { Users } from '../Users';
import { Notifications } from '../Notifications';
import { ApproveRequests } from '../AprroveRequests/ApproveRequests';
import { ShippingLocations } from '../ShippingLocations/ShippingLocations';
import { Settings } from '../Settings/Settings';
import { Logout } from '../../Logout/Logout';
import { UserDetails } from '../UserDetails';
import { DonorItems } from '../DonorItems';
import { OrdersList } from '../../../molecules/OrdersList';

export const adminTabs = [
    {
      name: 'Dashboard',
    content: <Statistics />
    },
    {
      name: 'Users',
    content: <Users />
    },
    {
      name: 'Messaging',
    content: <h2>Messaging</h2>
    },
    {
      name: 'Notifications',
    content: <Notifications />
    },
    {
      name: 'Approve Requests',
    content: <ApproveRequests />
    },
    {
      name: 'Shipping Locations',
    content: <ShippingLocations />
    },
    {
      name: 'Settings',
    content: <Settings />
    },
    {
      name: 'Logout',
    content: <Logout />
    },
]

export const donorTabs = [
    {
      name: 'My Details',
    content: <UserDetails />
    },
    {
      name: 'My Items',
    content: <DonorItems />
    },
    {
      name: 'Item Processing',
    content: <OrdersList />
    },
    {
      name: 'Messaging',
    content: <h1>messaging</h1>
    },
    {
      name: 'Logout',
    content: <Logout />
    },
]

export const shopperTabs = [
    {
        name: 'My Details',
      content: <UserDetails />
      },
      {
        name: 'My Orders',
      content: <OrdersList />
      },
      {
        name: 'Messaging',
      content: <h1>messaging</h1>
      },
      {
        name: 'Logout',
      content: <Logout />
      },
]