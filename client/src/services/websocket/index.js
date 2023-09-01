// https://stackoverflow.com/questions/62768520/reconnecting-web-socket-using-react-hooks
export default function handler(url) {
  let client;
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
    if (!url) return;

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
}
