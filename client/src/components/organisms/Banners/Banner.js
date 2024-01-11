import * as React from 'react';
import { StyledAlert } from './Banner.styles';

/**
 * TODO this should move to the services dir...
 */
const getBannerAlerts = async () => {
  const response = await fetch(`/api/banners`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.json();
  return body;
};

export const Banner = () => {
  const [banners, setBanners] = React.useState([]);

  React.useEffect(() => {
    getBannerAlerts().then(setBanners);
  }, []);

  return (
    <div>
      {banners.map((item) => {
        return (
          <div key={item._id}>
            <StyledAlert
              message={item.message || ''}
              description={item.description || ''}
              type={item.type || 'info'}
              closable
              showIcon
            />
          </div>
        );
      })}
    </div>
  );
};
