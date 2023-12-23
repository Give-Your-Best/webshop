import * as React from 'react';
import { StyledAlert } from './Banner.styles';

export const Banner = () => {
  return (
    <div>
      {[
        {
          _id: '65874e5d3cb54687fa82664a',
          type: 'info',
          message: 'Please note!',
          description:
            "Our team are on a break for the festive season and will be back on Jan 8th. The shop is still open but be aware that messages won't be answered and some items won't be shipped until January.",
        },
      ].map((item) => {
        return (
          <div key={item._id}>
            <StyledAlert
              message={item.message}
              description={item.description}
              type={item.type}
              closable
              showIcon
              // onClose={onClose}
            />
          </div>
        );
      })}
    </div>
  );
};
