<template lang="pug">
  .side-bar
    info-card
</template>

<script>
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
