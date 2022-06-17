export const getItems = async (page, limit, approvedStatus, itemStatus, category, subCategory, donorId, clothingSizes, shoeSizes, colours) => {
  
  let fetchString = `/api/items?page=${page}&limit=${limit}&approvedStatus=${approvedStatus}&itemStatus=${itemStatus}`
  
  if(category) fetchString = fetchString + `&category=${category}`;
  if(subCategory) fetchString = fetchString + `&subCategory=${subCategory}`;
  if(donorId && clothingSizes!=='') fetchString = fetchString + `&donorId=${donorId}`;
  if(clothingSizes && clothingSizes.length) fetchString = fetchString + `&clothingSizes=${clothingSizes}`;
  if(shoeSizes && shoeSizes.length) fetchString = fetchString + `&shoeSizes=${shoeSizes}`;
  if(colours && colours.length) fetchString = fetchString + `&colours=${colours}`;

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