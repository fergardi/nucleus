<template lang="pug">
  .tool-box
    mu-icon-button(icon="home")
    mu-icon-button(icon="fast_rewind")
    mu-icon-button(icon="play_arrow")
    mu-icon-button(icon="fast_forward")
    mu-icon-button(icon="border_clear")
    mu-icon-button(icon="map")
</template>

<script>
  export default {
    name: 'ToolBox'
  }
</script>

<style lang="stylus" scoped>
  .tool-box
    display inline-flex
    justify-content center
    align-items center
</style>