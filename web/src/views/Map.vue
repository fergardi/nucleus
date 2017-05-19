<template lang="pug">
  .leaflet-map
    loading-progress(:loading="loading")
    v-map#map(:zoom="map.zoom", :center="map.center")
      v-tilelayer(:url="map.url")
      v-marker(v-for="marker in map.markers", :lat-lng="marker.coordinates", :icon="marker.url")
    mu-float-button.float-button(icon="add")
</template>

<script>
  import Vue from 'vue'
  import Vue2Leaflet from 'vue2-leaflet'
  import store from '../vuex/store'
  import LoadingProgress from '../components/LoadingProgress.vue'
  import InfoCard from '../components/InfoCard.vue'

  Vue.component('v-map', Vue2Leaflet.Map)
  Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
  Vue.component('v-marker', Vue2Leaflet.Marker)

  export default {
    name: 'Map',
    components: { LoadingProgress, InfoCard },
    data () {
      return {
        loading: true,
        timeout: 2000,
        popup: true,
        map: {
          center: [47.413220, -1.219482],
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          zoom: 7,
          icons: [
            'https://image.flaticon.com/icons/svg/307/307034.svg',
            'https://image.flaticon.com/icons/svg/307/307003.svg',
            'https://image.flaticon.com/icons/svg/122/122492.svg',
            'https://image.flaticon.com/icons/svg/307/307021.svg'
          ],
          markers: [
            { coordinates: this.coordinates(), icon: this.icon() },
            { coordinates: this.coordinates(), icon: this.icon() },
            { coordinates: this.coordinates(), icon: this.icon() },
            { coordinates: this.coordinates(), icon: this.icon() }
          ]
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
        return [this.float(46, 47), this.float(-2, -1)]
      },
      icon () {
        return new L.icon({ // eslint-disable-line
          iconUrl: 'https://image.flaticon.com/icons/svg/307/307034.svg',
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        })
      },
      i18n (string) {
        return string // TODO
      }
    },
    computed: {
      info () {
        return store.state.info
      }
    }
  }
</script>

<style src="../../node_modules/leaflet/dist/leaflet.css"></style>

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