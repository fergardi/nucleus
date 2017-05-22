<template lang="pug">
  mu-card.info-card
    mu-card-header(:title="info.avatar.title", :subTitle="info.avatar.subtitle")
      mu-avatar.avatar(:src="info.avatar.src", slot="avatar", :class="info.avatar.color")

    mu-card-media(:title="info.media.title", :subTitle="info.media.subtitle")
      img(:src="info.media.src")

    template(v-for="block in info.content")
      mu-card-title(:title="block.title", :subTitle="block.subtitle")
      
      mu-card-text(v-if="block.metadata")
        .metadata
          mu-chip.chip(v-for="data in block.metadata")
            span.key {{ data.key }}
            span.value {{ data.value }}

      .container(v-if="block.gallery")
        mu-grid-list.gallery
          mu-grid-tile(v-for='image, index in block.gallery', :key='index')
            img(:src='image.src')
            span(slot='title') {{ image.title }}
            span(slot='subTitle') {{ image.subtitle }}
            mu-icon-button(icon='remove_red_eye', slot='action')

      .container(v-if="block.files")
        mu-grid-list.files
          mu-grid-tile(v-for='image, index in block.files', :key='index')
            img(:src='image.src')
            span(slot='title') {{ image.title }}
            span(slot='subTitle') {{ image.subtitle }}
            mu-icon-button(icon='remove_red_eye', slot='action')
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
    .container
      display flex
      flex-wrap wrap
      justify-content space-around
      .gallery
      .files
        margin 0 !important
        display flex
        flex-wrap nowrap
        overflow-x auto
      .mu-grid-tile-titlebar
        background-color rgba(0, 0, 0, 0.6)
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