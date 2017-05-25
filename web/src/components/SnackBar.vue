<template lang="pug">
  .snack-bar
    mu-snackbar(v-if="snackbar", :message="message", action="OK", @actionClick="close", @close="close")
</template>

<script>
  import store from '../vuex/store'

  export default {
    name: 'SnackBar',
    data () {
      return {
        snackbar: false,
        timeout: 2000
      }
    },
    watch: {
      message () {
        if (this.message) this.alert()
      }
    },
    methods: {
      alert () {
        this.snackbar = true
        if (this.snackTimer) clearTimeout(this.snackTimer)
        this.snackTimer = setTimeout(() => {
          this.snackbar = false
        }, this.timeout)
      },
      close () {
        this.snackbar = false
        if (this.snackTimer) clearTimeout(this.snackTimer)
      }
    },
    computed: {
      message () {
        return store.state.message
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>