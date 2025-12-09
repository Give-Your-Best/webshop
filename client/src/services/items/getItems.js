export const getItems = async (
  page,
  limit,
  approvedStatus,
  itemStatus,
  category,
  subCategory,
  donorId,
  clothingSizes,
  shoeSizes,
  colours
) => {
  let fetchString = `/api/items?page=${page}&limit=${limit}&approvedStatus=${approvedStatus}&itemStatus=${itemStatus}`;

  if (category) fetchString = fetchString + `&category=${category}`;
  if (subCategory) fetchString = fetchString + `&subCategory=${subCategory}`;
  if (donorId && clothingSizes !== '')
    fetchString = fetchString + `&donorId=${donorId}`;
  if (clothingSizes && clothingSizes.length)
    fetchString = fetchString + `&clothingSizes=${clothingSizes}`;
  if (shoeSizes && shoeSizes.length)
    fetchString = fetchString + `&shoeSizes=${shoeSizes}`;
  if (colours && colours.length)
    fetchString = fetchString + `&colours=${colours}`;

  try {
    const response = await fetch(fetchString, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorBody = await response.json();
        if (errorBody.message) {
          errorMessage = errorBody.message;
        }
      } catch (parseErr) {
        console.warn(
          `Failed to parse error response as JSON: ${parseErr.message}`
        );
        // If JSON parsing fails (e.g., HTML error page), use the default HTTP error message
      }
      return {
        success: false,
        message: errorMessage,
      };
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(`Error in getItems: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to fetch items',
    };
  }
};
