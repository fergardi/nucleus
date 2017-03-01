<template lang="pug">
  .app
    md-whiteframe
      md-toolbar.md-dense(v-once, v-if="!fullscreen")
        md-button.md-icon-button(v-on:click.native="toggle()")
          md-icon menu
        .flex
        h2.md-title Nucleus
        .flex
        md-button.md-icon-button
          md-icon search
    md-sidenav.md-left.md-fixed(ref="sidebar", md-swipeable, v-once, v-if="!fullscreen")
      md-whiteframe
        md-toolbar.md-account-header
          md-list.md-transparent
            md-list-item
              .flex
              h2.md-title Nucleus
              .flex
      small.flex.center.signature &copy;fergardi2017
    .main
      router-view#scroll.content.animation.fadeIn
</template>

<script>
  import vuex from './vuex/vuex.js'
  export default {
    methods: {
      toggle () {
        if (this.$refs.sidebar) this.$refs.sidebar.toggle()
      },
      close () {
        if (this.$refs.sidebar) this.$refs.sidebar.close()
      }
    },
    computed: {
      fullscreen () {
        return vuex.state.fullscreen
      }
    }
  }
</script>

<style lang="stylus">
  html
  body
  .app
    height 100%
    overflow hidden
  .app
    display flex
    flex-flow column
  .main
    overflow auto
    height 100%
  .content
    margin 0 !important
    height: 100%
  .md-chip
    margin-right 5px
    margin-bottom 5px
  .md-toolbar.md-account-header
    a:not(.md-button)
      color inherit
    .md-avatar-list
      .md-list-item-container
        align-items center
  .router-link-active
    background-color rgba(153, 153, 153, 0.2)
  .flex
    display flex
    flex 1
  .md-avatar-list
    .md-avatar
      .md-icon
        border-radius 50%
  .no-padding
    padding 0 !important
  .padding
    padding 16px
  .center
    align-items center
    text-align center
    justify-content center
  .hidden
    visibility hidden
  .signature
    width 100%
    position absolute
    bottom 0
    margin-bottom 1em
  /* ANIMATION TRANSITION */
  /*base code*/
  .animation
    -webkit-animation-duration 1s
    animation-duration 1s
    -webkit-animation-fill-mode both
    animation-fill-mode both
  .animation.infinite
    -webkit-animation-iteration-count infinite
    animation-iteration-count infinite
  .animation.slower
    -webkit-animation-duration 2s
    animation-duration 2s
  .animation.faster
    -webkit-animation-duration 0.5s
    animation-duration 0.5s
  /*the animation definition*/
  @keyframes fadeIn
    0%
      opacity 0
    100%
      opacity 1
  .fadeIn
    -webkit-animation-name fadeIn
    animation-name fadeIn
</style>