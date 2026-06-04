import * as React from 'react';
import { StyledAlert } from './Banner.styles';

/**
 * TODO this should move to the services dir...
 */
const getBannerAlerts = async () => {
  try {
    const response = await fetch(`/api/banners`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return [];
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return [];
    }

    const body = await response.json();
    return Array.isArray(body) ? body : [];
  } catch (error) {
    console.error(`Error in getBannerAlerts: ${error}`);
    return [];
  }
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
