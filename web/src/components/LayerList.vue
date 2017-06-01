<template lang="pug">
  .layer-list
    mu-list-item.list-item(v-for="layer, index1 in filtered", :title="layer.name", slot="nested", :toggleNested="true", :open="layer.opened", :disableRipple="true", :disableTouchRipple="true", :disableFocusRipple="true", :key="layer")
      mu-avatar(:src="layer.src", slot="leftAvatar")
      mu-badge(:content="count(layer)", slot="right")
      mu-checkbox(v-model="layer.checked", slot="right", :disabled="search", @change="update(layer.name, layer.checked)")

      mu-list-item.nested.list-item(v-for="item, index2 in layer.items", :title="item.avatar.title", :describeText="subtitle(item)", slot="nested", @click="select(item, index1, index2, layer)", :class="item === info ? 'selected' : ''", :disableRipple="true", :disableTouchRipple="true", :disableFocusRipple="true")
        mu-avatar.avatar(:src="item.avatar.src", slot="leftAvatar", :class="color(item)")
        mu-icon(value="place", slot="right")
</template>

<script>
  import store from '../vuex/store'
  import firebase from '../services/firebase'

  export default {
    name: 'LayerList',
    methods: {
      i18n (string) {
        return string // TODO
      },
      count (layer) {
        return layer.layers
          ? layer.layers.length.toString()
          : layer.items
            ? Object.keys(layer.items).length.toString()
            : '0'
      },
      select (item, index1, index2, layer) {
        store.commit('setInfo', { collection: layer.name, index: index1, item: index2 })
        if (!store.state.right) store.commit('toggleRight')
        store.commit('setCenter', item.coordinates)
      },
      update (name, value) {
        firebase.ref('layers').child(name).child('checked').set(value)
      },
      copy (object) {
        return Object.assign({}, object)
      },
      subtitle (item) {
        return item.shots
          ? Object.keys(item.shots).map(x => item.shots[x]).reduce((total, i) => total + i.quantity, 0) >= 3
            ? 'Muchos'
            : 'Pocos'
          : 'Ninguno'
      },
      color (item) {
        return item.shots
          ? Object.keys(item.shots).map(x => item.shots[x]).reduce((total, i) => total + i.quantity, 0) >= 3
            ? 'green'
            : 'orange'
          : 'red'
      }
    },
    firebase: {
      layers: firebase.ref('layers')
    },
    computed: {
      info () {
        return store.state.info
      },
      filtered () {
        return store.state.search.toLowerCase() === '' ? this.layers : this.layers.map(this.copy).filter(function recursive (item) {
          return item.name && item.name.toLowerCase().includes(store.state.search.toLowerCase()) || item.avatar && item.avatar.title.toLowerCase().includes(store.state.search.toLowerCase()) || item.items && (item.items = Object.keys(item.items).map(key => item.items[key]).filter(recursive)).length
        })
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
    .mu-item-title-row
      text-transform capitalize
    .mu-item-right
      .mu-badge-container
        position absolute
        right 35px
      .mu-icon-button
        position absolute
        right 60px
</style>
