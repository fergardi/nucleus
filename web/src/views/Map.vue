<template lang="pug">
  v-map#map(:zoom='13', :center='[47.413220, -1.219482]')
    v-tilelayer(url='http://{s}.tile.osm.org/{z}/{x}/{y}.png')
    v-marker(:lat-lng='[47.413220, -1.219482]')
</template>

<script>
  import Vue from 'vue'
  import Vue2Leaflet from 'vue2-leaflet'
  Vue.component('v-map', Vue2Leaflet.Map)
  Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
  Vue.component('v-marker', Vue2Leaflet.Marker)
</script>

<style src="../../node_modules/leaflet/dist/leaflet.css"></style>

<style lang="stylus" scoped>
  #map
    width 100%
    height 100%
    .leaflet-fake-icon-image-2x {
      background-image: url(../../node_modules/leaflet/dist/images/marker-icon-2x.png);
    }
    .leaflet-fake-icon-shadow {
      background-image: url(../../node_modules/leaflet/dist/images/marker-shadow.png);
    }
</style>