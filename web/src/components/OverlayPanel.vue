<template lang="pug">
  mu-bottom-sheet(:open="add || edit || shot", @close="close", sheetClass="info-panel")
    marker-form(v-if="add")
    layer-form(v-if="edit")
    shot-form(v-if="shot")
</template>

<script>
  import store from '../vuex/store'
  import MarkerForm from './MarkerForm.vue'
  import LayerForm from './LayerForm.vue'
  import ShotForm from './ShotForm.vue'

  export default {
    name: 'OverlayPanel',
    components: { MarkerForm, LayerForm, ShotForm },
    data () {
      return {
      }
    },
    methods: {
      close () {
        if (this.add) store.commit('toggleAdd')
        if (this.edit) store.commit('toggleEdit')
        if (this.shot) store.commit('toggleShot')
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
