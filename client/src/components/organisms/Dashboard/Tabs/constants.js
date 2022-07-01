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
    content: <DashboardImage />,
    id:'adminImage'
    },
    {
      name: 'Items',
    content: <AdminItems />,
    id:'adminItems'
    },
    {
      name: 'Users',
    content: <Users />,
    id:'adminUsers'
    },
    {
      name: 'Messaging',
    content: <AdminMessages />,
    id:'adminMessages'
    },
    {
      name: 'Notifications',
    content: <Notifications />,
    id:'adminNotif'
    },
    {
      name: 'Approve Requests',
    content: <ApproveRequests />,
    id:'adminApprove'
    },
    {
      name: 'Shipping Locations',
    content: <ShippingLocations />,
    id:'adminLocations'
    },
    {
      name: 'Settings',
    content: <Settings />,
    id:'adminSettings'
    },
    {
      name: 'Logout',
    content: <Logout />,
    id:'logout'
    },
]

export const donorTabs = [
    {
      name: 'Dashboard',
    content: <DashboardImage />,
    id:'adminImage'
    },
    {
      name: 'My Details',
    content: <UserDetails />,
    id:'donorDetails'
    },
    {
      name: 'My Items',
    content: <DonorItems />,
    id:'donorItems'
    },
    {
      name: 'Item Processing',
    content: <OrdersList />,
    id:'donorProcessing'
    },
    {
      name: 'Messaging',
    content: <UserMessages />,
    id:'donorMessages'
    },
    {
      name: 'Logout',
    content: <Logout />,
    id:'logout'
    },
]

export const shopperTabs = [
    {
      name: 'Dashboard',
    content: <DashboardImage />,
    id:'adminImage'
    },
    {
        name: 'My Details',
      content: <UserDetails />,
      id:'shopperDetails'
      },
      {
        name: 'My Orders',
      content: <OrdersList />,
      id:'shopperOrders'
      },
      {
        name: 'Messaging',
      content: <UserMessages />,
      id:'shopperMessages'
      },
      {
        name: 'Logout',
      content: <Logout />,
      id:'logout'
      },
]