import * as React from 'react';
import { AppContext } from './app-context';
import handler from '../services/websocket';

export const SocketContext = React.createContext();

export const SocketProvider = (props) => {
  const { token, user } = React.useContext(AppContext);

  console.log({ token, user });

  const socket = handler('ws://localhost:8000');

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
