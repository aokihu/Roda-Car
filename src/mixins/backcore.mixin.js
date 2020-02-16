export default {
  mounted() {
    this.$bcSocket.on('connect', () => {
      this.$store.commit('system/addSuccessLog', 'Backcore Socket connected');
    });

    this.$bcSocket.open();

    // GPS数据更新
    this.$bcSocket.on('msg_gps_change', (data) => {
      this.$bus.emit('msg_gps_change', data);
    });
  },
};
