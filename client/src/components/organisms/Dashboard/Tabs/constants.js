import { Users } from '../Users';
import { Notifications } from '../Notifications';
import { ApproveRequests } from '../AprroveRequests/ApproveRequests';
import { ShippingLocations } from '../ShippingLocations/ShippingLocations';
import { Settings } from '../Settings/Settings';
import { Logout } from '../../Logout/Logout';
import { UserDetails } from '../UserDetails';
import { AdminMessages } from '../AdminMessages';
import { UserMessages } from '../UserMessages';
import { DonorItems } from '../DonorItems';
import { AdminItems } from '../AdminItems';
import { OrdersList } from '../../../molecules/OrdersList';
import { DashboardImage } from '../../../atoms/DashboardImage/DashboardImage';

export const adminTabs = [
    {
      name: 'Dashboard',
    content: <DashboardImage />
    },
    {
      name: 'Items',
    content: <AdminItems />
    },
    {
      name: 'Users',
    content: <Users />
    },
    {
      name: 'Messaging',
    content: <AdminMessages />
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
      name: 'Dashboard',
    content: <DashboardImage />
    },
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
    content: <UserMessages />
    },
    {
      name: 'Logout',
    content: <Logout />
    },
]

export const shopperTabs = [
    {
      name: 'Dashboard',
    content: <DashboardImage />
    },
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
      content: <UserMessages />
      },
      {
        name: 'Logout',
      content: <Logout />
      },
]