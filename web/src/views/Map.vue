<template lang="pug">
  v-map#map(:zoom="zoom", :center="center")
    v-tilelayer(url="http://{s}.tile.osm.org/{z}/{x}/{y}.png")
    v-marker(v-for="marker in markers", :lat-lng="marker.coordinates", :url="marker.url")
</template>

<script>
  import Vue from 'vue'
  import Vue2Leaflet from 'vue2-leaflet'

  Vue.component('v-map', Vue2Leaflet.Map)
  Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
  Vue.component('v-marker', Vue2Leaflet.Marker)

  export default {
    name: 'Map',
    data () {
      return {
        center: [47.413220, -1.219482],
        zoom: 13,
        markers: [
          { coordinates: [47.413220, -1.219482], url: 'https://image.flaticon.com/icons/svg/307/307034.svg' },
          { coordinates: [47.413220, -1.219482], url: 'https://image.flaticon.com/icons/svg/307/307003.svg' },
          { coordinates: [47.413220, -1.219482], url: 'https://image.flaticon.com/icons/svg/122/122492.svg' },
          { coordinates: [47.413220, -1.219482], url: 'https://image.flaticon.com/icons/svg/307/307021.svg' }
        ]
      }
    }
  }
</script>

<style src="../../node_modules/leaflet/dist/leaflet.css"></style>

<style lang="stylus" scoped>
  #map
    width 100%
    height 100%
</style>