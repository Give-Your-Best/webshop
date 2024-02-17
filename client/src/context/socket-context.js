import * as React from 'react';
import Pusher from 'pusher-js';
import { AppContext } from './app-context';
import pusherConfig from '../config/pusher';

const { appKey, cluster } = pusherConfig;

const pusher = new Pusher(appKey, { cluster });

export const SocketContext = React.createContext(null);

export const SocketProvider = (props) => {
  const { user } = React.useContext(AppContext);

  console.log({ user });

  const channel = pusher.subscribe(
    `notify@${user.type === 'admin' ? 'admin' : user.id}`
  );

  return (
    <SocketContext.Provider value={channel}>
      {props.children}
    </SocketContext.Provider>
  );
};
