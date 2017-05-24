<template lang="pug">
  mu-bottom-sheet(:open="panel", @close="close", sheetClass="info-panel")
    data-stepper
</template>

<script>
  import store from '../vuex/store'
  import DataStepper from './DataStepper.vue'

  export default {
    name: 'OverlayPanel',
    components: { DataStepper },
    data () {
      return {
      }
    },
    methods: {
      close () {
        store.commit('togglePanel')
      }
    },
    computed: {
      panel () {
        return store.state.panel
      }
    }
  }
</script>

<style lang="stylus">
  .mu-bottom-sheet.info-panel
    height calc(100% - 64px)
    padding 16px
    .form
      display flex
      flex-direction row
      justify-content space-around
      align-items center
  @media (max-width 768px)
    .mu-bottom-sheet.info-panel
      height calc(100% - 56px)
</style>
