<template lang="pug">
  .pop-up
    mu-dialog(:open="popup", :title="dialog.title", @close="close")
      img(:src="dialog.src")
      mu-flat-button(slot="actions", @click="open", primary="", label="Open")
      mu-flat-button(slot="actions", @click="download", primary="", label="Download")
      mu-flat-button(slot="actions", @click="close", primary="", label="Close")
</template>

<script>
  import store from '../vuex/store'

  export default {
    name: 'PopUp',
    data () {
      return {
        popup: false
      }
    },
    watch: {
      dialog () {
        if (this.dialog) this.alert()
      }
    },
    methods: {
      alert () {
        this.popup = true
      },
      close () {
        store.commit('resetDialog')
        this.popup = false
      },
      download () {
        window.open(this.dialog.src, '_blank')
        store.commit('resetDialog')
        this.popup = false
      },
      open () {
        window.open(this.dialog.src, '_blank')
        store.commit('resetDialog')
        this.popup = false
      }
    },
    computed: {
      dialog () {
        return store.state.dialog
      }
    }
  }
</script>

<style lang="stylus">
  .mu-dialog
    width auto
    .mu-dialog-body
      img
        height 250px
</style>