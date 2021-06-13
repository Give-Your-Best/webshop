import * as React from 'react';
import { useParams } from 'react-router-dom';

export const Item = () => {
  let { itemId } = useParams();
  return (
    <div>
      <h1>{`Item page! item id: ${itemId}`}</h1>
    </div>
  );
};
