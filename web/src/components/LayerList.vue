<template lang="pug">
  .layer-list
    mu-list-item(v-for="category in layers", :title="category.name", slot="nested", :toggleNested="true", :open="category.opened", :disableRipple="true", :disableTouchRipple="true", :disableFocusRipple="true")
      mu-badge(:content="count(category)", slot="right")
      mu-switch(v-if="category.radio", v-model="category.checked", slot="right", @change="toggle(category)")
      mu-checkbox(v-else, v-model="category.checked", slot="right", @change="toggle(category)")

      mu-list-item.nested(v-for="subcategory in category.layers", :title="subcategory.name", slot="nested", :toggleNested="true", :open="subcategory.opened", :disableRipple="true", :disableTouchRipple="true", :disableFocusRipple="true")
        mu-badge(:content="count(subcategory)", slot="right")
        mu-switch(v-if="subcategory.radio", v-model="subcategory.checked", slot="right", @change="toggle(subcategory)")
        mu-checkbox(v-else, v-model="subcategory.checked", slot="right", @change="toggle(subcategory)")
        
        mu-list-item.nested(v-for="layer in subcategory.layers", :title="layer.name", slot="nested", :toggleNested="true", :open="layer.opened", :disableRipple="true", :disableTouchRipple="true", :disableFocusRipple="true")
          mu-badge(:content="count(layer)", slot="right")
          mu-switch(v-if="layer.radio", v-model="layer.checked", slot="right")
          mu-checkbox(v-else, v-model="layer.checked", slot="right")

          mu-list-item.nested(v-for="item in layer.items", :title="item.avatar.title", :describeText="item.avatar.subtitle", slot="nested", @click="select(item)", :class="item === info ? 'selected' : ''", :disableRipple="true", :disableTouchRipple="true", :disableFocusRipple="true")
            mu-avatar.avatar(:src="item.avatar.src", slot="leftAvatar", :class="item.avatar.color")
            mu-icon(value="place", slot="right")
</template>

<script>
  import store from '../vuex/store'

  export default {
    name: 'LayerList',
    props: ['layers'],
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
