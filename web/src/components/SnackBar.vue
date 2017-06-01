<template lang="pug">
  .snack-bar
    mu-snackbar(v-if="toast", :message="message", action="OK", @actionClick="close", @close="close")
</template>

<script>
  import store from '../vuex/store'

  export default {
    name: 'SnackBar',
    created () {
      store.watch((state) => state.toast, () => {
        if (this.toast) this.alert()
      })
    },
    methods: {
      alert () {
        if (this.snackTimer) clearTimeout(this.snackTimer)
        this.snackTimer = setTimeout(() => {
          store.commit('setToast', false)
        }, 2000)
      },
      close () {
        if (this.snackTimer) clearTimeout(this.snackTimer)
        store.commit('setToast', false)
      }
    },
    computed: {
      toast () {
        return store.state.toast
      },
      message () {
        return store.state.message
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>