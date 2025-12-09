import { convertHeic } from '../../utils/helpers';

export const createBatchItem = async (values, token) => {
  // handle image conversion
  if (values.photos) {
    try {
      values.photos = await convertHeic(values.photos);
    } catch (convErr) {
      console.error(`Image conversion failed in createBatchItem: ${convErr}`);
      return {
        success: false,
        message: convErr.message || 'Failed to convert images',
      };
    }
  }

  //call api to create batch item
  try {
    const response = await fetch('/api/batchItems/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(values),
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
    console.error(`Error in createBatchItem: ${error}`);
    return {
      success: false,
      message: error.message || 'Failed to create batch item',
    };
  }
};
