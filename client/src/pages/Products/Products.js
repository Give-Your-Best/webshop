import * as React from 'react';
import { useParams } from 'react-router-dom';
import { categories } from '../../utils/constants';
// import { AppContext } from '../../context/app-context';

export const Products = () => {
  // const { token } = React.useContext(AppContext);
  const { category } = useParams();
  let categoryName = '';
  categories.forEach((c) => {
    if (c.id === category) {
      categoryName = c.name;
    }
  })
  // const [authenticated, setAuthenticated] = React.useState(false);

  // React.useEffect(() => {
  //   const callTestApi = async () => {
  //     const res = await fetch('/api/test-auth-items', {
  //       mode: 'cors',
  //       cache: 'no-cache',
  //       credentials: 'same-origin',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': token,
  //       },
  //     });
  //     setAuthenticated(res.ok);
  //   };
  //   callTestApi();

  //   return () => {
  //     // cleanup
  //   };
  // }, [token]);

  return (
    <div>
      <h2>{`Products listed here for category: ${categoryName}`}</h2>
      {/* <p>{`authenticated: ${authenticated}`}</p> */}
    </div>
  );
};
