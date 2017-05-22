<template lang="pug">
  .side-bar
    info-card(v-if="info", :info="info")
    p.padding(v-else) Seleccione un elemento para continuar
</template>

<script>
  import store from '../vuex/store'
  import InfoCard from './InfoCard.vue'

  export default {
    name: 'RightSideBar',
    components: { InfoCard },
    data () {
      return {}
    },
    methods: {
      i18n (string) {
        return string // TODO
      }
    },
    computed: {
      info () {
        return store.state.info
      }
    }
  }
</script>

<style lang="stylus">
  .padding
    padding 10px
    .slider
    .search
      width auto
      margin 0 15px
      margin 0 15px
      width auto
</style>
