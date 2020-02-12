import Client from 'socket.io-client';

const options = {
  forceNew: true,
  port: 3000,
  transports: ['websocket'],
  autoConnect: false, // 默认不自动连接
};


export default ({ Vue }) => {
  const client = Client('ws://192.168.3.254:3000', options);
  Vue.prototype.$socket = client;
};
