/**
 * https://cloudinary.com/blog/guest_post/photo-gallery-with-automatic-thumbnails-using-react-and-cloudinary
 */
export const getImageUrl = ({ cloudName, publicId, transformations }) => {
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}.jpg`;
};

/**
 * Get the secure signed url from backend...
 */
export const getSignedUrl = async (params, token) => {
  console.log({ params, token });
  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(params),
    };

    const result = await fetch('/api/cloudinary/signed_url', options).then(
      (res) => res.json()
    );

    if (result.success === false) {
      throw new Error(result.message);
    }

    return result;
  } catch (e) {
    console.error(`Error in cloudinary get signed url: ${e}`);
    return { error: e };
  }
};

/**
 * Trigger buld deletion via the admin api for cleanup actions.
 */
export const bulkDelete = async (ids, token) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ publicIds: ids }),
    };

    const result = await fetch(
      '/api/cloudinary/delete_resources',
      options
    ).then((res) => res.json());

    if (result.success === false) {
      throw new Error(result.message);
    }

    return result;
  } catch (e) {
    console.error(`Error in cloudinary bulk delete resources: ${e}`);
    return { error: e };
  }
};

/**
 * https://cloudinary.com/documentation/image_upload_api_reference#signed_upload_syntax
 * https://cloudinary.com/documentation/image_upload_api_reference#error_handling
 */
export const assetUpload = async (formData, cloudname) => {
  try {
    const result = JSON.parse(
      await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
        method: 'POST',
        body: formData,
      }).then((res) => res.text())
    );

    return result;
  } catch (e) {
    console.error(`Error in cloudinary asset upload: ${e}`);
    return { error: e };
  }
};

/**
 * https://cloudinary.com/documentation/image_upload_api_reference#destroy_syntax
 * https://cloudinary.com/documentation/image_upload_api_reference#error_handling
 */
export const assetDestroy = async (formData, cloudname) => {
  try {
    const result = JSON.parse(
      await fetch(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/destroy`,
        {
          method: 'POST',
          body: formData,
        }
      ).then((res) => res.text())
    );

    return result;
  } catch (e) {
    console.error(`Error in cloudinary asset destroy: ${e}`);
    return { error: e };
  }
};
