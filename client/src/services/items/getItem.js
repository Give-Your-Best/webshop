export const getItem = async (id) => {
    console.log(id);
    const response = await fetch(`/api/items/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log(body)
    return body;
  };