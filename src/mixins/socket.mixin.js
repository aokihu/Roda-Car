import SimplePeer from 'simple-peer';

export default {
  mounted() {
    const { peerId, type } = this.$store.state.system.settings;
    let callId;

    // ----------------------Socket 连接事件 --------------------------

    // 注册设备信息
    this.$socket.on('connect', () => {
      this.$store.commit('system/addSuccessLog', 'Socket connected');
      this.connectFlag = 'connected';
      this.$socket.emit('register', { id: peerId, type, renew: true });
    });

    this.$socket.on('disconnect', () => {
      this.$store.commit('system/addFailLog', 'Socket disconnected');
    });

    this.$socket.on('reconnecting', (attemptNumber) => {
      this.$store.commit('system/addLog', `Socket reconnecting... (${attemptNumber})`);
    });

    this.$socket.on('reconnect', (attemptNumber) => {
      this.$store.commit('system/addSuccessLog', `Socket reconnect (${attemptNumber})`);
    });

    // ---------------------------------------------------------------
    this.$socket.on('register_success', () => {
      this.$store.commit('system/addSuccessLog', 'Register success');
      this.$socket.emit('who_is_online');
    });

    this.$socket.on('register_fail', () => {
      this.$store.commit('system/addFailLog', 'Register failed');
    });

    this.$socket.on('ret_who_is_online', () => {
    });

    this.$socket.on('answer', (data) => {
      if (!this.$peer) { this.$peer = new SimplePeer(); }
      this.$store.commit('system/addLog', 'Receive answer signal');
      const { fromId, payload } = data;
      callId = fromId;
      this.$peer.signal(JSON.parse(payload));
    });

    this.$socket.open();
    this.$store.commit('system/addLog', 'Socket connecting...');

    // P2P
    this.$peer.on('signal', (data) => {
      console.log(peerId, callId, data);
      this.$socket.emit('call', {
        fromId: peerId,
        destId: callId,
        payload: JSON.stringify(data),
      });
    });

    this.$peer.on('connect', () => {
      this.$store.commit('system/addSuccessLog', 'P2P connected');
      this.$peer.send('hello');

      // Try video stream
      navigator.getUserMedia({ video: true, audio: false },
        (stream) => {
          this.$peer.addStream(stream);
        },
        (err) => {
          this.$store.commit('system/addFailLog', `Get media stream fail ${err}`);
        });
    });

    this.$peer.on('error', () => {
      this.$store.commit('system/addFailLog', 'P2P Error');
    });

    this.$peer.on('data', (data) => {
      this.$store.commit('system/addLog', `Recv: ${data.toString()}`);
    });
  },
};
