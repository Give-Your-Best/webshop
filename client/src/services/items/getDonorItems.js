export const getDonorItems = async (userId, itemStatus) => {
  try {
    const response = await fetch(
      `/api/items/donor?userId=${userId}${
        itemStatus ? '&itemStatus=' + itemStatus : ''
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const body = await response.json();
    if (response.status !== 200) {
      return {
        success: false,
        message: body.message || 'Failed to fetch donor items',
      };
    }
    return body;
  } catch (error) {
    console.error(`Error in getDonorItems: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to fetch donor items',
    };
  }
};
