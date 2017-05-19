<template lang="pug">
  .side-bar
    mu-list.padding
      mu-sub-header {{ 'lbl_opacity' | i18n }}
      mu-slider.slider(v-model="opacity")
      mu-sub-header {{ 'lbl_toc' | i18n }}
      mu-text-field.search(:label="i18n('lbl_search')", :hintText="i18n('lbl_search')", v-model="search", labelfloat)
      layer-list(:layers="filtered")
</template>

<script>
  import store from '../vuex/store'
  import LayerList from '../components/LayerList.vue'

  export default {
    name: 'LeftSideBar',
    components: { LayerList },
    data () {
      return {
        opacity: 50,
        search: ''
      }
    },
    methods: {
      i18n (string) {
        return string // TODO
      }
    },
    computed: {
      filtered () {
        return this.layers // TODO
      },
      layers () {
        return store.state.layers
      }
    }
  }
</script>

<style lang="stylus">
  .padding
    padding 10px
    .slider
    .search
      width auto
      margin 0 15px
      margin 0 15px
      width auto
</style>
