import { notification as AntNotify } from 'antd';

export const Notification = (title, description, type, duration = 40) => {
  AntNotify[type]({
    message: title,
    className: 'notificationStyle',
    duration: duration,
    description: description,
  });
};
