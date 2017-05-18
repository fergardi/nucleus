<template lang="pug">
  .app
    mu-appbar(:title="i18n('lbl_navbar')")
      mu-icon-button(icon="menu", slot="left", @click="toggleSidebar()")
      mu-text-field.appbar-search-field(icon="search", slot="right", :hintText="i18n('lbl_search')")
      mu-icon-button(icon="lock_open", slot="right")
    mu-drawer(:open="open", :docked="false", @close="toggleSidebar()")
      mu-appbar(:title="i18n('lbl_sidebar')")
        mu-icon-button(icon="menu", slot="left", @click="toggleSidebar()")
      mu-list
        mu-sub-header {{ 'lbl_layers' | i18n }}
        mu-list-item(v-for="category in layers", :title="category.name", :open="category.open", toggleNested)
          mu-list-item(v-for="layer in category.layers", disableRipple, @click="toggleLayer(layer)", :title="layer.name", slot="nested")
            mu-switch(v-model="layer.checked", slot="right")
    .main
      router-view.animation.fadeIn
</template>

<script>
  export default {
    data () {
      return {
        open: false,
        layers: [
          { name: 'lbl_operational_layers', opened: true, layers: [
            { name: 'lbl_incidents', checked: true },
            { name: 'lbl_resources', checked: true },
            { name: 'lbl_infrastructures', checked: true }
          ] }
        ]
      }
    },
    methods: {
      toggleSidebar (flag) {
        this.open = !this.open
      },
      toggleLayer (layer) {
        layer.checked = !layer.checked
      },
      i18n (string) {
        return string // TODO
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
</style>