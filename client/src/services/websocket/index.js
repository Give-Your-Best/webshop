/* eslint-disable react/prop-types */
// import React from 'react';

const URL = 'ws://localhost:8000';

// https://stackoverflow.com/questions/62768520/reconnecting-web-socket-using-react-hooks
const connectionHandler = (url) => {
  let client;
  // let poller;
  let isConnected = false;
  let reconnectOnClose = true;
  let messageListeners = [];
  let changeListeners = [];

  const on = (cb) => {
    messageListeners.push(cb);
  };

  const off = (cb) => {
    messageListeners = messageListeners.filter((l) => l !== cb);
  };

  const onStateChange = (cb) => {
    changeListeners.push(cb);
    return () => {
      changeListeners = changeListeners.filter((l) => l !== cb);
    };
  };

  const start = () => {
    // if (isConnected) {
    //   return (poller = clearInterval(poller));
    // }

    client = new WebSocket(url);

    client.onopen = () => {
      isConnected = true;
      changeListeners.forEach((fn) => fn(true));
    };

    const close = client.close;

    client.close = () => {
      reconnectOnClose = false;
      close.call(client);
    };

    client.onmessage = (event) => {
      messageListeners.forEach((fn) => fn(event.data));
    };

    client.onerror = (e) => console.error(e);

    client.onclose = () => {
      isConnected = false;
      changeListeners.forEach((fn) => fn(false));

      if (!reconnectOnClose) {
        console.log('ws closed by app');
        return;
      }

      console.log('ws closed by server');

      setTimeout(start, 5000);
    };

    // client.onclose = () => {
    //   isConnected = false;
    //   changeListeners.forEach((fn) => fn(false));

    //   if (!reconnectOnClose) {
    //     console.log('ws closed by app');
    //     return;
    //   }

    //   console.log('ws closed by server');

    //   const logStart = () => {
    //     console.log('attempting to connect');
    //     start();
    //   };

    //   poller = setInterval(logStart, 2000);
    // };
  };

  start();

  return {
    on,
    off,
    onStateChange,
    close: () => client.close(),
    getClient: () => client,
    isConnected: () => isConnected,
  };
};

export const socket = connectionHandler(URL);

// export const SocketContext = React.createContext(socket);

// export const SocketProvider = (props) => (
//   <SocketContext.Provider value={socket}>
//     {props.children}
//   </SocketContext.Provider>
// );
