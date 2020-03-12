<template>
  <q-page class="flex flex-center bg-grey-10">
    <div class="column items-center" @mousedown="clickDevWidget">
      <img alt="Quasar logo" src="~assets/robot-eye.svg">
    </div>
    <!-- 调试设置对话框 -->
    <setting-dialog />
    <!-- @end 调试设置对话框 -->
    <!-- 状态指示器 -->
    <status class="absolute-top-right" />
  </q-page>
</template>

<script>
import Status from 'src/components/status';
import SettingDialog from 'src/components/settingDialog';

export default {
  name: 'PageIndex',
  components: { SettingDialog, Status },
  computed: {
    isDevMode() { return this.$store.state.system.devmode.enable; },
  },
  methods: {
    clickDevWidget() {
      this.$store.dispatch('system/clickDevWidget');
    },
  },
};
</script>
