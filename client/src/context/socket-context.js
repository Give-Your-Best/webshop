import * as React from 'react';
import { AppContext } from './app-context';
import handler from '../services/websocket';

export const SocketContext = React.createContext(null);

export const SocketProvider = (props) => {
  const { user } = React.useContext(AppContext);

  // TODO - will need some logic here for setting the socket uri depending on
  // current environment etc...s

  const socket = handler(user ? 'ws://localhost:8000' : undefined);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
