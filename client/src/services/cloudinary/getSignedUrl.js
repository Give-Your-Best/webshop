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
