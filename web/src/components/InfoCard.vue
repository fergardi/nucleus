<template lang="pug">
  mu-card.info-card
    mu-card-header(:title="info.avatar.title", :subTitle="info.avatar.subtitle")
      mu-avatar.marker(:src="info.avatar.image", slot="avatar", :class="info.avatar.color")

    mu-card-media(:title="info.media.title", :subTitle="info.media.subtitle")
      img(:src="info.media.image")

    template(v-for="block in info.content")
      mu-card-title(:title="block.title", :subTitle="block.subtitle")
      mu-card-text
        .metadata
          mu-chip.chip(v-for="data in block.metadata")
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
  .info-card
    .mu-avatar
      background-color transparent
    .metadata
      display flex
      flex-direction row
      justify-content space-between
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
        .value
          font-weight bold
        .key
        .value
          padding 0 10px
          font-size 12px
</style>