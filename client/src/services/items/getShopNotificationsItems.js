import { parseErrorResponse } from '../../utils/responseHandler';

export const getShopNotificationsItems = async (token) => {
  const response = await fetch(`/api/items/shopNotification`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });
  if (!response.ok) {
    return await parseErrorResponse(response);
  }
  const body = await response.json();
  return body;
};
