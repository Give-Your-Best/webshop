const manageAsset = (action) => async (formData, cloudname) => {
  try {
    const result = JSON.parse(
      await fetch(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/${action}`,
        {
          method: 'POST',
          body: formData,
        }
      ).then((res) => res.text())
    );

    return result;
  } catch (error) {
    // TODO
    console.error(`Error in cloudinary manage asset: ${error}`);
    return error;
  }
};

export const handleDestroy = manageAsset('destroy');

export const handleUpload = manageAsset('upload');
