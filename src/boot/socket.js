import Client from 'socket.io-client';

const options = {
  forceNew: true,
  transports: ['websocket'],
  autoConnect: false, // 默认不自动连接
};

export default ({ Vue }) => {
  const client = Client('ws://192.168.3.254:3000', options);
  Vue.prototype.$socket = client;

  // 连接设备的后端控制核心
  const backcoreClient = Client('ws://192.168.3.254:8031', options);
  Vue.prototype.$bcSocket = backcoreClient;

  Vue.prototype.$bcSocketSendCmd = (type, payload) => {
    const cmd = { type, payload };
    Vue.prototype.$bcSocket.emit('cmd', JSON.stringify(cmd));
  };
};
