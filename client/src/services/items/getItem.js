export const getItem = async (id) => {
  try {
    const response = await fetch(`/api/items/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      return {
        success: false,
        message: body.message || 'Failed to fetch item',
      };
    }
    return body;
  } catch (error) {
    console.error(`Error in getItem: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to fetch item',
    };
  }
};
