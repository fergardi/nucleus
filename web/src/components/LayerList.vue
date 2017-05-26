<template lang="pug">
  .layer-list
    mu-list-item(v-for="layer in filtered", :title="layer.name", slot="nested", :toggleNested="true", :open="layer.opened", :disableRipple="true", :disableTouchRipple="true", :disableFocusRipple="true")
      mu-badge(:content="count(layer)", slot="right")
      mu-switch(v-if="layer.radio", v-model="layer.checked", slot="right", :disabled="search")
      mu-checkbox(v-else, v-model="layer.checked", slot="right", :disabled="search")

      mu-list-item.nested(v-for="item in layer.items", :title="item.avatar.title", :describeText="item.avatar.subtitle", slot="nested", @click="select(item)", :class="item === info ? 'selected' : ''", :disableRipple="true", :disableTouchRipple="true", :disableFocusRipple="true")
        mu-avatar.avatar(:src="item.avatar.src", slot="leftAvatar", :class="item.avatar.color")
        mu-icon(value="place", slot="right")
</template>

<script>
  import store from '../vuex/store'

  export default {
    name: 'LayerList',
    methods: {
      toggle (layer, parent = true) {
        if (!parent) layer.checked = !layer.checked
        if (layer.layers) layer.layers.forEach((children) => this.toggle(children, false))
      },
      i18n (string) {
        return string // TODO
      },
      count (layer) {
        return layer.layers
          ? layer.layers.length.toString()
          : layer.items
            ? layer.items.length.toString()
            : '0'
      },
      select (marker) {
        store.commit('setInfo', marker)
        if (!store.state.right) store.commit('toggleRight')
        store.commit('setCenter', marker.coordinates)
      }
    },
    computed: {
      info () {
        return store.state.info
      },
      filtered () {
        return store.getters.filtered
      },
      search () {
        return store.state.search !== ''
      }
    }
  }
</script>

<style lang="stylus">
  .nested
    margin-left 20px
    &.selected
      background-color rgba(0,0,0,0.12)
  .mu-item
    .mu-item-right
      .mu-badge-container
        position absolute
        right 35px
      .mu-icon-button
        position absolute
        right 60px
</style>
