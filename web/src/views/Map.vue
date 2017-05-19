<template lang="pug">
  .leaflet-map
    v-map#map(:zoom="zoom", :center="center")
      v-tilelayer(url="http://{s}.tile.osm.org/{z}/{x}/{y}.png")
      v-marker(v-for="marker in markers", :lat-lng="marker.coordinates", :icon="marker.url")
    mu-float-button.float-button(icon='add')
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
    },
    methods: {
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