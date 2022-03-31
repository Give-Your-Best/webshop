import * as React from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/app-context';

export const Item = () => {
  const { token } = React.useContext(AppContext);
  const { itemId } = useParams();
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const callTestApi = async () => {
      const res = await fetch('/api/test-auth-items', {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });
      setAuthenticated(res.ok);
    };
    callTestApi();

    return () => {
      // cleanup
    };
  }, [token]);

  return (
    <div>
      <h1>{`Item page! item id: ${itemId}`}</h1>
      <p>{`authenticated: ${authenticated}`}</p>
    </div>
  );
};
