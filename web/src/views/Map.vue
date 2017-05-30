<template lang="pug">
  .leaflet-map
    loading-progress(:loading="loading")

    v-map#map(:zoom="map.zoom", :center="map.center", :min-zoom="map.min", :max-zoom="map.max", ref="map")
      v-tilelayer(:url="map.url")
      v-group(v-for="layer, index1 in filtered", v-if="layer.checked")
        v-marker(v-for="item, index2 in layer.items", :lat-lng="item.coordinates", :icon="icon(item.avatar.src, item.avatar.color)", @l-click="select(item, index1, index2)")

    mu-float-button.fab.left(icon="edit", @click="edit")
    mu-float-button.fab.right(icon="add", @click="add")

    overlay-panel
</template>

<script>
  import firebase from '../services/firebase'
  import L from 'leaflet'
  import Vue2Leaflet from 'vue2-leaflet'
  import store from '../vuex/store'
  import LoadingProgress from '../components/LoadingProgress.vue'
  import InfoCard from '../components/InfoCard.vue'
  import OverlayPanel from '../components/OverlayPanel.vue'

  export default {
    name: 'Map',
    components: {
      LoadingProgress,
      InfoCard,
      OverlayPanel,
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'v-marker': Vue2Leaflet.Marker,
      'v-group': Vue2Leaflet.LayerGroup
    },
    data () {
      return {
        loading: true,
        timeout: 1000
      }
    },
    mounted () {
      setTimeout(() => {
        this.loading = false
        store.commit('setMap', this.$refs.map.mapObject) // store the leaflet map into vuex
        store.state.map.L.zoomControl.remove()
      }, this.timeout)
    },
    methods: {
      select (item, index1, index2) {
        store.commit('setInfo', { collection: index1, item: index2 })
        if (!store.state.right) store.commit('toggleRight')
        store.commit('setCenter', item.coordinates)
      },
      icon (url, className) {
        return L.icon({ // eslint-disable-line
          iconUrl: url,
          iconSize: [this.map.iconSize, this.map.iconSize],
          iconAnchor: [this.map.iconSize / 2, this.map.iconSize / 2],
          className: 'marker ' + className
        })
      },
      i18n (string) {
        return string // TODO
      },
      add () {
        store.commit('toggleAdd')
      },
      edit () {
        store.commit('toggleEdit')
      },
      copy (object) {
        return Object.assign({}, object)
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
      map () {
        return store.state.map
      }
    }
  }
</script>

<style src="../../node_modules/leaflet/dist/leaflet.css"></style>

<style lang="stylus">
  .leaflet-control-zoom
    display none
  .marker
  .avatar
    border-radius 50%
    padding 3px
    border 3px solid
    &.red
      border-color red
    &.green
      border-color green
    &.blue
      border-color blue
    &.yellow
      border-color yellow
    &.orange
      border-color orange
    &.purple
      border-color purple
    &.pink
      border-color pink
    &.cyan
      border-color cyan
    background-color rgba(255,255,255,0.9)
  .marker:hover
    border-color black !important
</style>

<style lang="stylus" scoped>
  .leaflet-map
  #map
    width 100%
    height 100%
  .fab
    position absolute
    z-index 5000
    bottom 10px
    &.right
      right 10px
    &.left
      left 10px
</style>