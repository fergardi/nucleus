<template lang="pug">
  .tool-box
    mu-icon-button(icon="menu")
    mu-icon-button(icon="menu")
    mu-icon-button(icon="menu")
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