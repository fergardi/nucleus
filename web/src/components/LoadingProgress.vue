<template lang="pug">
  transition(name="fade")
    .loading-progress(v-if="loading")
      mu-circular-progress(:size="size", :color="color")
</template>

<script>
  export default {
    name: 'LoadingProgress',
    props: ['loading'],
    data () {
      return {
        size: 100,
        color: 'red'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .loading-progress
    position absolute
    background-color rgba(0,0,0,0.5)
    display flex
    justify-content center
    align-items center
    z-index 9999
    width 100%
    height 100%
    pointer-events all
  .fade-enter-active, .fade-leave-active
    transition opacity 1s
  .fade-enter, .fade-leave-to
    opacity 0
</style>