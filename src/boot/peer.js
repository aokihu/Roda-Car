import Peer from 'simple-peer';

export default ({ Vue, store }) => {
  const { $socket } = Vue.prototype;

  Vue.prototype.$createPeer = () => {
    const { peerId, destId } = store.state.system.settings;
    const peer = new Peer();

    // 解析收到的数据
    const functionMaps = {
      start_video() {
        // Try video stream
        navigator.getUserMedia({ video: true, audio: false },
          (stream) => {
            peer.addStream(stream);
          },
          (err) => {
            store.commit('system/addFailLog', `Get media stream fail ${err}`);
          });
      },
    };

    function parseData(rawData) {
      const { type, payload } = JSON.parse(rawData);
      console.log('parse data', type, payload);

      if (functionMaps[type]) {
        functionMaps[type](payload);
      }
    }

    peer.on('signal', (data) => {
      store.commit('system/addLog', 'Receive peer signal');
      $socket.emit('call', {
        fromId: peerId,
        destId,
        payload: JSON.stringify(data),
      });
    });

    peer.on('connect', () => {
      store.commit('system/addSuccessLog', 'P2P connected');
      peer.send('hello');
    });

    peer.on('error', () => {
      store.commit('system/addFailLog', 'P2P Error');
      Vue.prototype.$peer = Vue.prototype.$createPeer();
    });

    peer.on('data', (data) => {
      store.commit('system/addLog', `Recv: ${data.toString()}`);
      parseData(data);
    });

    store.commit('system/addSuccessLog', 'P2P begin');

    Vue.prototype.$peer = peer;

    return peer;
  };
};
