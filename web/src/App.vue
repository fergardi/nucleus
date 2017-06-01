<template lang="pug">
  .app
    mu-appbar(title="Shots")
      mu-icon-button(icon="menu", slot="left", @click="toggleLeft")
      tool-box(slot="default")
      mu-icon-button(icon="visibility", slot="right", @click="toggleRight", :class="{'hidden' : !info}")

    mu-drawer.sidebar(:open="left", :docked="docked", @close="toggleLeft")
      mu-appbar Negocios
        mu-icon-button(icon="menu", slot="left", @click="toggleLeft")
        mu-icon-button.hidden(icon="close", slot="right", @click="toggleLeft")
      left-side-bar

    mu-drawer.sidebar(:open="right", :docked="docked", @close="toggleRight", right)
      mu-appbar Detalles
        mu-icon-button.hidden(icon="close", slot="left", @click="clearInfo")
        mu-icon-button(icon="visibility_off", slot="right", @click="toggleRight")
      right-side-bar

    .main
      snack-bar
      pop-up(v-if="dialog")
      router-view.animation.fadeIn
</template>

<script>
  import store from './vuex/store'
  import LeftSideBar from './components/LeftSideBar.vue'
  import RightSideBar from './components/RightSideBar.vue'
  import SnackBar from './components/SnackBar.vue'
  import ToolBox from './components/ToolBox.vue'
  import PopUp from './components/PopUp.vue'

  export default {
    name: 'App',
    components: { LeftSideBar, RightSideBar, SnackBar, ToolBox, PopUp },
    methods: {
      toggleLeft () {
        store.commit('toggleLeft')
      },
      toggleRight () {
        store.commit('toggleRight')
      },
      clearInfo () {
        store.commit('resetInfo')
        store.commit('toggleRight')
      },
      i18n (string) {
        return string // TODO
      }
    },
    computed: {
      left () {
        return store.state.left
      },
      right () {
        return store.state.right
      },
      dialog () {
        return store.state.dialog
      },
      info () {
        return store.state.info
      },
      docked () {
        return store.state.docked
      }
    }
  }
</script>

<style src="../css/font.css"></style>
<style src="../css/icon.css"></style>
<style src="../node_modules/muse-ui/dist/muse-ui.css"></style>
<style src="../node_modules/muse-ui/dist/theme-default.css"></style>

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
  .flex
    display flex
  .center
    justify-content center
    align-items center
  .hidden
    visibility hidden
  .mu-appbar-title
    display flex
    justify-content center
    align-items center
  .mu-drawer
    overflow hidden
    z-index 9999
    .side-bar
      height calc(100% - 64px)
      overflow-y auto
  .mu-grid-tile-titlebar
    background-color rgba(0, 0, 0, 0.6) !important
</style>

<style lang="stylus">
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

<style lang="stylus">
  /* MEDIA QUERIES */
  @media (min-width 769px)
    .sidebar
      width 25%
  @media (max-width 768px)
    .sidebar
      width: 90%
    .search
      display none
</style>