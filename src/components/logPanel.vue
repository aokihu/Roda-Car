<template>
  <q-scroll-area class="fit bg-grey-10">
    <q-list dense class="full-width">
      <template v-for="log of logs">
        <q-item :key="log.index" active :active-class="logColor(log.type)">
          <q-item-section>{{log.content}}</q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-scroll-area>
</template>

<script>
export default {
  computed: {
    logs() {
      return this.$store.state.system.log.list;
    },
  },
  methods: {
    logColor(type) {
      switch (type) {
        case 1:
          return 'text-green-9';
        case 2:
          return 'text-red-5';
        case 3:
          return 'text-orange-5';
        case 0:
        default:
          return 'text-grey-7';
      }
    },
  },
};
</script>
