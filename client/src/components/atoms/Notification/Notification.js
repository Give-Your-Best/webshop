import { notification as AntNotify } from 'antd';

export const Notification = (title, description, type) => {
  AntNotify[type]({
    message: title,
    className: 'notificationStyle',
    duration: 40,
    description: description,
  });
};
