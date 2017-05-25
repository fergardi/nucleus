<template lang="pug">
  .side-bar
    mu-list
      layer-list(:layers="filtered")
</template>

<script>
  import store from '../vuex/store'
  import LayerList from '../components/LayerList.vue'
  import InfoCard from '../components/InfoCard.vue'

  export default {
    name: 'LeftSideBar',
    components: { LayerList, InfoCard },
    data () {
      return {
        opacity: 50
      }
    },
    methods: {
      i18n (string) {
        return string // TODO
      }
    },
    computed: {
      filtered () {
        return this.layers // TODO
      },
      layers () {
        return store.state.layers
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
