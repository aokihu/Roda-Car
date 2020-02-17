import Client from 'socket.io-client';

const options = {
  // forceNew: true,
  path: '/io',
  transports: ['websocket', 'polling'],
  autoConnect: false, // 默认不自动连接
};

export default ({ Vue }) => {
  const client = Client('https://roda.appbox.top', options);
  Vue.prototype.$socket = client;

  // 连接设备的后端控制核心
  const backcoreClient = Client('ws://127.0.0.1:8031', { forceNew: true, transports: ['websocket'], autoConnect: false });
  Vue.prototype.$bcSocket = backcoreClient;

  Vue.prototype.$bcSocketSendCmd = (type, payload) => {
    const cmd = { type, payload };
    Vue.prototype.$bcSocket.emit('cmd', JSON.stringify(cmd));
  };
};
