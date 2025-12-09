import { parseErrorResponse } from '../../utils/responseHandler';

export const getAccountNotificationsItems = async (adminUserId, token) => {
  const response = await fetch(
    `/api/items/accountNotification?adminUserId=${adminUserId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }
  );
  if (!response.ok) {
    return await parseErrorResponse(response);
  }
  const body = await response.json();
  return body;
};
