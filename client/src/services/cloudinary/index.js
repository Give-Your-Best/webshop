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

    return result;
  } catch (error) {
    // TODO
    console.error(`Error in cloudinary get signed url: ${error}`);
    return error;
  }
};

/**
 * https://cloudinary.com/documentation/image_upload_api_reference#signed_upload_syntax
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
  } catch (error) {
    // TODO
    console.error(`Error in cloudinary asset upload: ${error}`);
    return error;
  }
};

/**
 * https://cloudinary.com/documentation/image_upload_api_reference#destroy_syntax
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
  } catch (error) {
    console.error(`Error in cloudinary asset destroy: ${error}`);
    return error;
  }
};
