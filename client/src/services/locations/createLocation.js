export const createLocation = async ( values, token ) => {
    //call api to create location
    console.log('location service')
    try {
      const response = await fetch('/api/locations/', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(values)
      });
      const jsonres = await response.json();
      return jsonres;
    } catch (error) {
      console.error(`Error in createLocation: ${error}`);
      return error;
    }
  };
  