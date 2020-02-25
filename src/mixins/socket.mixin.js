
export default {
  mounted() {
    const { peerId, type } = this.$store.state.system.settings;
    this.peerId = peerId;
    this.type = type;

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

    this.$socket.on('prepare_call', (data) => {
      const { fromId, type: peerType } = data;
      this.$store.commit('system/addSuccessLog', `Call from (${fromId})`);
      this.$store.commit('system/setDestId', fromId);

      switch (peerType) {
        case 'data':
        default:
          this.$peerCreate();
          break;
        case 'media':
          this.$mediaStreamPeerCreate();
          break;
      }

      // 发送call_ready事件给拨号者
      this.$socket.emit('call_ready', { fromId: peerId, destId: fromId, type: peerType });
      this.$store.commit('system/addSuccessLog', `Replay caller ${fromId}`);
    });

    this.$socket.on('answer', (data) => {
      this.$store.commit('system/addLog', 'Receive answer signal');
      const { fromId, payload, type: peerType } = data;

      this.destId = fromId;
      switch (peerType) {
        case 'data':
        default:
          this.$peer.signal(JSON.parse(payload));
          break;
        case 'media':
          this.$mediaStreamPeer.signal(JSON.parse(payload));
          break;
      }
    });


    this.$socket.open();
    this.$store.commit('system/addLog', 'Socket connecting...');
  },
};
