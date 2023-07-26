import * as React from 'react';
import { StyledProgress } from './ProgressBar.styles';
import {
  adminItemStatus,
  donorItemStatus,
  shopperItemStatus,
  adminAllItemStatus,
} from './constants';

export const ProgressBar = ({ type, status }) => {
  let progress = 0;
  let progressText = '';

  const getDetails = (i) => {
    if (i.status === status) {
      progress = i.progress;
      progressText = i.statusText;
    }
  };

  switch (type) {
    default:
      break;
    case 'admin':
      adminItemStatus.map((i) => {
        getDetails(i);
        return true;
      });
      break;
    case 'all':
      adminAllItemStatus.map((i) => {
        getDetails(i);
        return true;
      });
      break;
    case 'donor':
      donorItemStatus.map((i) => {
        getDetails(i);
        return true;
      });
      break;
    case 'shopper':
      shopperItemStatus.map((i) => {
        getDetails(i);
        return true;
      });
      break;
  }

  return (
    <>
      <StyledProgress percent={progress} showInfo={false} />
      <p>{progressText}</p>
    </>
  );
};
