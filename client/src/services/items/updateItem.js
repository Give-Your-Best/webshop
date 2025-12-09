import { convertHeic } from '../../utils/helpers';

export const updateItem = async (id, updateData, token) => {
  // handle image conversion
  if (updateData.photos) {
    try {
      updateData.photos = await convertHeic(updateData.photos);
    } catch (convErr) {
      console.error(`Image conversion failed in updateItem: ${convErr}`);
      return {
        success: false,
        message: convErr.message || 'Failed to convert images',
      };
    }
  }

  //call api to update item details
  try {
    const response = await fetch(`/api/items/${id}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(updateData),
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
    const jsonres = await response.json();
    return jsonres;
  } catch (error) {
    console.error(`Error in updateItem: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to update item',
    };
  }
};
