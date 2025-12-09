import { parseErrorResponse } from '../../utils/responseHandler';

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
    if (!response.ok) {
      return await parseErrorResponse(response);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(`Error in deleteDonorItems: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to delete donor items',
    };
  }
};
