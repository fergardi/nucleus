<template lang="pug">
  .leaflet-map
    loading-progress(:loading="loading")

    v-map#map(:zoom="map.zoom", :center="map.center")
      v-tilelayer(:url="map.url")

      v-group(v-for="category in layers", v-if="category.checked")
        v-marker(v-for="marker1 in category.items", :lat-lng="marker1.coordinates", :icon="icon(marker1.avatar.src, marker1.avatar.color)", @l-click="select(marker1)")

        v-group(v-for="subcategory in category.layers", v-if="subcategory.checked")
          v-marker(v-for="marker2 in subcategory.items", :lat-lng="marker2.coordinates", :icon="icon(marker2.avatar.src, marker2.avatar.color)", @l-click="select(marker2)")

          v-group(v-for="layer in subcategory.layers", v-if="layer.checked")
            v-marker(v-for="marker3 in layer.items", :lat-lng="marker3.coordinates", :icon="icon(marker3.avatar.src, marker3.avatar.color)", @l-click="select(marker3)")

    mu-float-button.float-button(icon="add")
</template>

<script>
  import Vue2Leaflet from 'vue2-leaflet'
  import store from '../vuex/store'
  import LoadingProgress from '../components/LoadingProgress.vue'
  import InfoCard from '../components/InfoCard.vue'

  export default {
    name: 'Map',
    components: {
      LoadingProgress,
      InfoCard,
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'v-marker': Vue2Leaflet.Marker,
      'v-group': Vue2Leaflet.LayerGroup
    },
    data () {
      return {
        loading: true,
        timeout: 2000,
        popup: true,
        selected: null,
        map: {
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          center: [42.58, -5.60],
          zoom: 13,
          iconSize: 40 // px, even
        }
      }
    },
    mounted () {
      store.commit('setMessage', 'Loading data...')
      setTimeout(() => {
        this.loading = false
        store.commit('setMessage', 'Ready!')
      }, this.timeout)
    },
    methods: {
      select (marker) {
        store.commit('setInfo', marker)
        if (!store.state.right) store.commit('toggleRight')
        // this.map.center = [marker.coordinates[0], marker.coordinates[1]]
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
      }
    },
    computed: {
      info () {
        return store.state.info
      },
      layers () {
        return store.state.layers
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
    padding 2px
    border 2px solid
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
  .float-button
    position absolute
    bottom 10px
    right 10px
    z-index 9999
</style>