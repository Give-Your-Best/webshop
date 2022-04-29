import { Statistics } from '../Statistics';
import { Users } from '../Users';
import { Notifications } from '../Notifications';
import { ApproveRequests } from '../AprroveRequests/ApproveRequests';
import { ShippingLocations } from '../ShippingLocations/ShippingLocations';
import { Settings } from '../Settings/Settings';
import { Logout } from '../../Logout/Logout';
import { UserDetails } from '../UserDetails';

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
      name: 'My details',
    content: <UserDetails />
    },
    {
      name: 'My items',
    content: <h1>items</h1>
    },
    {
      name: 'Item processing',
    content: <h2>processing</h2>
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
        name: 'My details',
      content: <UserDetails />
      },
      {
        name: 'My orders',
      content: <h1>orders</h1>
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