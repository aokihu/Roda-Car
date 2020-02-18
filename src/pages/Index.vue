<template>
  <q-page class="flex flex-center bg-grey-10">
    <div class="column items-center" @mousedown="clickDevWidget">
      <img alt="Quasar logo" src="~assets/robot-eye.svg">
      <div v-if="isDevMode" class="text-white">Dev Mode</div>
    </div>


  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
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
