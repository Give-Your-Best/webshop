export const deleteDonorItems = async (id, token) => {
  try {
    const response = await fetch(`/api/items/donor/${id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      return {
        success: false,
        message: body.message || 'Failed to delete donor items',
      };
    }
    return body;
  } catch (error) {
    console.error(`Error in deleteDonorItems: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to delete donor items',
    };
  }
};
