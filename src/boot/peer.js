import Peer from 'simple-peer';

export default ({ Vue }) => {
  Vue.prototype.$peer = new Peer();
};
