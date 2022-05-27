export const getItems = async (approvedStatus, itemStatus, category, subCategory, donorId) => {
  let fetchString = `/api/items?approvedStatus=${approvedStatus}&itemStatus=${itemStatus}`
  if(category) fetchString = fetchString + `&category=${category}`;
  if(subCategory) fetchString = fetchString + `&subCategory=${subCategory}`;
  if(donorId) fetchString = fetchString + `&donorId=${donorId}`;

  const response = await fetch(fetchString, {
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