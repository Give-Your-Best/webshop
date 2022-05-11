export const getItems = async (approvedStatus, type, userId, itemStatus) => {
  const response = await fetch(`/api/items?type=${type}&userId=${userId}&itemStatus=${itemStatus}${(approvedStatus)? '&approvedStatus='+ approvedStatus: ''}`, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};