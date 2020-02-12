<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          RoBot Car
        </q-toolbar-title>

        <div>
          <q-btn :icon="settingIcon" label="Setting" flat />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="logShow"
        side="right"
        show-if-above
        :width="300"
        :breakpoint="700"
        elevated>
      <log-panel />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LogPanel from 'src/components/logPanel';
import { matSettings } from '@quasar/extras/material-icons';
import SocketMixin from 'src/mixins/socket.mixin';

export default {
  name: 'MainLayout',

  components: {
    LogPanel,
  },
  mixins: [SocketMixin],

  data() {
    return {
      logShow: true,
      connectFlag: 'disconnect',
    };
  },
  created() {
    this.settingIcon = matSettings;
  },
};
</script>
