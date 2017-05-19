<template lang="pug">
  .app
    mu-appbar {{ 'lbl_navbar' | i18n }}
      mu-icon-button(icon="menu", slot="left", @click="toggle()")
      mu-text-field.appbar-search-field.search(icon="search", slot="right", :hintText="i18n('lbl_search')")
      mu-icon-button(icon="lock_open", slot="right")
    mu-drawer(:open="open", :docked="false", @close="toggle()", :width="percent")
      mu-appbar {{ 'lbl_navbar' | i18n }}
        mu-icon-button(icon="menu", slot="left", @click="toggle()")
      side-bar
    .main
      snack-bar
      router-view.animation.fadeIn
</template>

<script>
  import SideBar from './components/SideBar.vue'
  import SnackBar from './components/SnackBar.vue'

  export default {
    name: 'App',
    components: { SideBar, SnackBar },
    data () {
      return {
        open: false
      }
    },
    methods: {
      toggle (flag) {
        this.open = !this.open
      },
      i18n (string) {
        return string // TODO
      }
    },
    computed: {
      percent () {
        return window.innerWidth <= 768 ? '85%' : '30%'
      }
    }
  }
</script>

<style src="../css/font.css"></style>
<style src="../css/icon.css"></style>
<style src="../node_modules/muse-ui/dist/muse-ui.css"></style>
<style src="../node_modules/muse-ui/dist/theme-carbon.css"></style>

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
  /* MEDIA QUERIES */
  @media (max-width 768px)
    .search
      display none
</style>