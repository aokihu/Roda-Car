import Peer from 'simple-peer';

// 获取有效的音频和视频媒体设备
async function getAvaliableInputDevices() {
  // 检查设备支持哪些设备
  const devices = await navigator.mediaDevices.enumerateDevices();

  const audios = devices.filter(d => d.kind === 'audioinput');
  const videos = devices.filter(d => d.kind === 'videoinput');

  return { videos, audios };
}

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

    peer.on('connect', async () => {
      store.commit('system/addSuccessLog', 'P2P connected');
      store.commit('system/p2pConnected');

      const { audios, videos } = await getAvaliableInputDevices();

      const constraints = { audio: false, video: false };

      // 设置音频的约束
      if (audios.length > 0) {
        constraints.audio = {
          deviceId: audios[0].deviceId,
          channelCount: 1,
          noiseSuppression: true, // 噪音消除
          echoCancellation: true, // 回音消除
        };
      }

      // 设置视频的约束
      if (videos.length > 0) {
        constraints.video = {
          deviceId: videos[0].deviceId,
          width: { min: 320, ideal: 640, max: 1280 },
          height: { min: 240, ideal: 480, max: 1080 },
          frameRate: { min: 10, ideal: 24, max: 60 },
        };
      }

      // 获取媒体流
      navigator.getUserMedia(constraints,
        (stream) => { peer.addStream(stream); },
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
