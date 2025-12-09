export const getBatchItem = async (id) => {
  try {
    const response = await fetch(`/api/batchItems/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      return {
        success: false,
        message: body.message || 'Failed to fetch batch item',
      };
    }
    return body;
  } catch (error) {
    console.error(`Error in getBatchItem: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to fetch batch item',
    };
  }
};
