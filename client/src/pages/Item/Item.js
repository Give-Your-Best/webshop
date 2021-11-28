import * as React from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/app-context';

export const Item = () => {
  const { token } = React.useContext(AppContext);
  const { itemId } = useParams();

  React.useEffect(() => {
    const callTestApi = async () => {
      console.log('token!', token);
      const res = await fetch('/api/test-auth-items', {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });
      console.log('test RES!', await res.json());
    };
    callTestApi();
  }, []);

  return (
    <div>
      <h1>{`Item page! item id: ${itemId}`}</h1>
    </div>
  );
};
