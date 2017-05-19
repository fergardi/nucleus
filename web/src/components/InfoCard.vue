<template lang="pug">
  .info-card
    mu-card
      mu-card-header(:title='info.avatar.title', :subTitle='info.avatar.subtitle')
        mu-avatar(:src='info.avatar.image', slot='avatar')
      mu-card-media(:title='info.media.title', :subTitle='info.media.subtitle')
        img(:src='info.media.image')
      mu-card-title(:title='info.content.title', :subTitle='info.content.subtitle')
      mu-card-text
        .metadata
          mu-chip.chip(v-for="data in info.metadata")
            span.key {{ data.key }}
            span.value {{ data.value }}
</template>

<script>
  export default {
    name: 'InfoCard',
    props: ['info']
  }
</script>

<style lang="stylus" scoped>
  .metadata
    display flex
    flex-direction row
    justify-content flex-start
    align-items center
    flex-wrap wrap
    .chip
      margin 1px
      padding 0
      border-radius 20px
      .key
        background-color grey
        color white
        border-radius inherit
        padding 0 10px
      .value
        padding 0 10px
</style>