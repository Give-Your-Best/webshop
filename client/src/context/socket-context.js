import * as React from 'react';

import { socket } from '../services/websocket';

export const SocketContext = React.createContext(socket);

export const SocketProvider = (props) => (
  <SocketContext.Provider value={socket}>
    {props.children}
  </SocketContext.Provider>
);
