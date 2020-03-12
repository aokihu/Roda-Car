<template>
  <q-dialog
    v-model="showed"
    seamless position="bottom">
    <q-card dark style="min-width:300px; min-height:80px">
      <!-- 调试模式功能 -->
      <q-list dark class="text-accent">
        <q-item-label header class="text-grey-8">Develop Mode</q-item-label>
        <template v-for="(item,index) of devFunctions">
          <q-item :key="`devfunc-${index}`" clickable @click="item.handler">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{item.label}}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex';

// const { mapState } = createNamespacedHelpers('setting');

export default {
  data() {
    return {
      devFunctions: [
        { label: 'TOGGLE KIOSK', icon: 'fullscreen', handler: () => { console.log(this); } },
        {
          label: 'TOGGLE LOG',
          icon: 'assignment',
          handler: () => {
            console.log(this.$store.state);
            this.$store.commit('system/toggleLogShowed');
          },
        },
      ],
    };
  },
  computed: {
    showed: {
      get() { return this.$store.state.system.devmode.enable; },
      set(mode) { this.$store.commit('system/setDevMode', mode); },
    },
  },
  methods: {
    show() { this.showed = true; },
    hide() { this.showed = false; },
  },
};
</script>
