import { notification as AntNotify } from 'antd';

export const Notification = (title, description, type) => {
  AntNotify[type]({
    message: title,
    description: description
  });
};