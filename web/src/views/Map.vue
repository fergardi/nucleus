<template lang="pug">
  .leaflet-map
    loading-progress(:loading="loading")
    v-map#map(:zoom="map.zoom", :center="map.center")
      v-tilelayer(:url="map.url")
      v-group(v-for="markers in groups")
        v-marker(v-for="marker in markers", :lat-lng="coordinates()", :icon="icon(marker.icon, marker.class)")
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
        map: {
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          center: [42.5804942, -5.599022500000046],
          zoom: 11,
          iconSize: 32 // px, even
        }
      }
    },
    mounted () {
      store.state.message = 'Loading data...'
      setTimeout(() => {
        this.loading = false
        store.state.message = 'Data loaded succesfully!'
      }, this.timeout)
    },
    methods: {
      open () {
        this.popup = true
      },
      close () {
        this.popup = false
      },
      float (min, max) {
        return min + Math.random() * (max - min)
      },
      coordinates () {
        return [this.float(42.5, 42.7), this.float(-5.5, -5.7)]
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
      },
      groups () {
        return store.state.groups
      }
    }
  }
</script>

<style src="../../node_modules/leaflet/dist/leaflet.css"></style>

<style lang="stylus">
  .marker
    border-radius 50%
    padding 2px
    border 2px solid
    background-color rgba(255,255,255,0.8)
    &.red
      border-color red
    &.green
      border-color green
    &.blue
      border-color blue
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