import Peer from 'simple-peer';

export default ({ Vue, store }) => {
  const { $socket, $bus } = Vue.prototype;

  // 创建P2P连接
  Vue.prototype.$peerCreate = () => {
    // 保证Peer的唯一性
    if (Vue.prototype.$peer) {
      Vue.prototype.$peer.destroy();
    }

    const { peerId, destId } = store.state.system.settings;

    const peer = new Peer({
      config: {
        chnnaelNaame: 'data-channel',
        ordered: false,
        maxPacketLifeTime: 0,
        maxRetransmits: 1,
        iceServers: [
          {
            urls: ['stun:stun.appbox.top', 'turn:turn.appbox.top'],
            username: 'aokihu',
            credential: 'abcd1234',
          },
        ],
      },
    });


    // 解析收到的数据
    const functionMaps = {
      start_video() {
        $bus.emit('p2p_mediastream_start');
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
      store.commit('system/addLog', 'Receive peer signal');
      $socket.emit('call', {
        fromId: peerId,
        destId,
        type: 'data',
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
      // Vue.prototype.$peer = Vue.prototype.$createPeer();
    });

    peer.on('data', (data) => {
      store.commit('system/addLog', `Recv: ${data.toString()}`);
      parseData(data);
    });

    store.commit('system/addSuccessLog', 'P2P[Data] begin');

    Vue.prototype.$peer = peer;

    return peer;
  };

  // 创建媒体流P2P连接
  Vue.prototype.$mediaStreamPeerCreate = () => {
    // 保证Peer的唯一性
    if (Vue.prototype.$mediaStreamPeer) {
      Vue.prototype.$mediaStreamPeer.destroy();
    }

    const { peerId, destId } = store.state.system.settings;

    const peer = new Peer({
      config: {
        channelName: 'media-channel',
        iceServers: [
          {
            urls: ['stun:stun.appbox.top', 'turn:turn.appbox.top'],
            username: 'aokihu',
            credential: 'abcd1234',
          },
        ],
      },
    });


    peer.on('signal', (data) => {
      store.commit('system/addLog', 'Receive peer signal');
      $socket.emit('call', {
        fromId: peerId,
        destId,
        type: 'media',
        payload: JSON.stringify(data),
      });
    });

    peer.on('connect', () => {
      store.commit('system/addSuccessLog', 'P2P connected');
      store.commit('system/p2pConnected');
      navigator.getUserMedia({
        video: {
          width: { min: 320, ideal: 320, max: 640 },
          height: { min: 240, ideal: 240, max: 480 },
          frameRate: { min: 24, ideal: 30, max: 60 },
        },
        audio: true,
      },
      (stream) => {
        peer.addStream(stream);
      },
      (err) => {
        store.commit('system/addFailLog', `Get media stream fail ${err}`);
      });
    });

    peer.on('error', () => {
      store.commit('system/addFailLog', 'P2P Error');
      store.commit('system/p2pDisconnected');
      Vue.prototype.$mediaStreamPeer.destory();
    });

    store.commit('system/addSuccessLog', 'P2P[Media Stream] begin');

    Vue.prototype.$mediaStreamPeer = peer;

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
