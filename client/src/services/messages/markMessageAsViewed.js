export const markMessageAsViewed = async ( id, messageIds, token ) => {
    //call api to mark message as viewd
    let values = {
      'messageIds': messageIds
    }
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body:JSON.stringify(values),
      });
      const jsonres = await response.json();
      return jsonres;
    } catch (error) {
      console.error(`Error in mark as viewed ${error}`);
      return error;
    }
  };
  