<template lang="pug">
  mu-bottom-sheet(:open="open", @close="close", sheetClass="info-panel")
    marker-form(v-if="add")
    layer-form(v-if="edit")
    shot-form(v-if="shot")
    settings-form(v-if="settings")
</template>

<script>
  import store from '../vuex/store'
  import MarkerForm from './MarkerForm.vue'
  import LayerForm from './LayerForm.vue'
  import ShotForm from './ShotForm.vue'
  import SettingsForm from './SettingsForm.vue'

  export default {
    name: 'OverlayPanel',
    components: { MarkerForm, LayerForm, ShotForm, SettingsForm },
    data () {
      return {
      }
    },
    methods: {
      close () {
        if (this.add) store.commit('toggleAdd')
        if (this.edit) store.commit('toggleEdit')
        if (this.shot) store.commit('toggleShot')
        if (this.settings) store.commit('toggleSettings')
      }
    },
    computed: {
      add () {
        return store.state.add
      },
      edit () {
        return store.state.edit
      },
      shot () {
        return store.state.shot
      },
      settings () {
        return store.state.settings
      },
      open () {
        return store.state.add || store.state.edit || store.state.shot || store.state.settings
      }
    }
  }
</script>

<style lang="stylus">
  .mu-bottom-sheet.info-panel
    height calc(100% - 64px)
    padding 8px
    background-color rgba(255,255,255,0.95)
    width 100%
    overflow-y auto
    overflow-x hidden
    .form
      display flex
      flex-direction row
      justify-content space-around
      align-items center
  @media (max-width 768px)
    .mu-bottom-sheet.info-panel
      height calc(100% - 56px)
</style>
