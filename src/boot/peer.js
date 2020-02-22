import Peer from 'simple-peer';

export default ({ Vue, store }) => {
  const { $socket, $bus } = Vue.prototype;

  // 创建P2P连接
  Vue.prototype.$createPeer = () => {
    // 保证Peer的唯一性
    if (Vue.prototype.$peer) {
      Vue.prototype.$peer.destroy();
    }

    const { peerId, destId } = store.state.system.settings;

    const peer = new Peer({
      config: {
        iceServers: [
          {
            urls: ['st un:stun.appbox.top', 'turn:turn.appbox.top'],
            // urls: ['stun:stun.appbox.top'],
            username: 'aokihu',
            credential: 'abcd1234',
          },
        ],
      },
    });


    // 解析收到的数据
    const functionMaps = {
      start_video() {
        // Try video stream
        navigator.getUserMedia({
          video: {
            width: { min: 320, ideal: 320, max: 640 },
            height: { min: 240, ideal: 240, max: 480 },
            frameRate: { ideal: 24, max: 60 },
          },
          audio: false,
        },
        (stream) => {
          peer.addStream(stream);
        },
        (err) => {
          store.commit('system/addFailLog', `Get media stream fail ${err}`);
        });
      },
      motion_update(payload) {
        $bus.emit('p2p_motion_update', payload);
      },
    };

    function parseData(rawData) {
      const { type, payload } = JSON.parse(rawData);

      if (functionMaps[type]) {
        functionMaps[type](payload);
      }
    }

    peer.on('signal', (data) => {
      console.log(data);
      store.commit('system/addLog', 'Receive peer signal');
      $socket.emit('call', {
        fromId: peerId,
        destId,
        payload: JSON.stringify(data),
      });
    });

    peer.on('connect', () => {
      store.commit('system/addSuccessLog', 'P2P connected');
      store.commit('system/p2pConnected');
      peer.send('hello');
    });

    peer.on('error', () => {
      store.commit('system/addFailLog', 'P2P Error');
      store.commit('system/p2pDisconnected');
      Vue.prototype.$peer.destroy();
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

  // P2P发送消息
  Vue.prototype.$peerSendData = (type, payload) => {
    const data = { type, payload };
    const { isConnected } = store.state.system.p2p;

    if (Vue.prototype.$peer && isConnected) {
      Vue.prototype.$peer.send(JSON.stringify(data));
      store.commit('system/addLog', `SEND '${type}' with '${JSON.stringify(payload)}'`);
    }
  };
};
