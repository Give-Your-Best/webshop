import * as React from 'react';

import connectionHandler from '../services/websocket';

const socket = connectionHandler('ws://localhost:8000');

export const SocketContext = React.createContext(socket);

export const SocketProvider = (props) => (
  <SocketContext.Provider value={socket}>
    {props.children}
  </SocketContext.Provider>
);
