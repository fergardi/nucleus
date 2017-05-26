<template lang="pug">
  mu-bottom-sheet(:open="add || edit", @close="close", sheetClass="info-panel")
    //data-stepper
    abstract-form(v-if="add")
</template>

<script>
  import store from '../vuex/store'
  import AbstractForm from './AbstractForm.vue'

  export default {
    name: 'OverlayPanel',
    components: { AbstractForm },
    data () {
      return {
      }
    },
    methods: {
      close () {
        if (this.add) store.commit('toggleAdd')
        if (this.edit) store.commit('toggleEdit')
      }
    },
    computed: {
      add () {
        return store.state.add
      },
      edit () {
        return store.state.edit
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
