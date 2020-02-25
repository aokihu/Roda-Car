export default {
  created() {
    // [bc->p2p] GPS数据更新
    this.$bus.on('msg_gps_change', payload => this.$peerSendData('p2p_gps_change', payload));

    // [p2p->bc] 动作更新
    this.$bus.on('p2p_motion_update', payload => this.$bcSocketSendCmd('msg_motion_update', payload));

    // 启动视频流P2P
    this.$bus.on('p2p_mediastream_start', () => {
      this.$mediaStreamPeerCreate();
    });
  },
};
