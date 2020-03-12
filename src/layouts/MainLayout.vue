<template>
  <q-layout>
    <q-drawer v-model="logShow"
        side="right"
        :width="300"
        :breakpoint="700"
        elevated>
      <log-panel />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <div class="fixed-bottom-left q-ma-sm text-grey-7">
      ver: 1.0.0
    </div>
  </q-layout>
</template>

<script>
import LogPanel from 'src/components/logPanel';
import { matSettings } from '@quasar/extras/material-icons';
import BusMixin from 'src/mixins/bus.mixin';
import SocketMixin from 'src/mixins/socket.mixin';
import BackcoreMixin from 'src/mixins/backcore.mixin';
import DataMixin from 'src/mixins/data.mixin';
import PeerMixin from 'src/mixins/peer.mixin';

export default {
  name: 'MainLayout',

  components: {
    LogPanel,
  },
  mixins: [BusMixin, DataMixin, SocketMixin, PeerMixin, BackcoreMixin],

  data() {
    return {
      connectFlag: 'disconnect',
    };
  },
  computed: {
    logShow: {
      get() { return this.$store.state.system.devmode.logShowed; },
      set() { this.$store.commit('system/toggleLogShoed'); },
    },
  },
  created() {
    this.settingIcon = matSettings;
  },
};
</script>
