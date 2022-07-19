export const sendMail = async ( values, token ) => {
    try {
      const response = await fetch('/api/mail/', {
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
      console.error(`Error in send mail: ${error}`);
      return error;
    }
  };
  