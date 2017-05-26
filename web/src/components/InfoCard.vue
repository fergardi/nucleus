<template lang="pug">
  mu-card.info-card
    // HEADER
    mu-card-header(:title="info.avatar.title", :subTitle="info.avatar.subtitle")
      mu-avatar.avatar(:src="info.avatar.src", slot="avatar", :class="info.avatar.color")

    // MEDIA
    mu-card-media.media(:title="info.media.title", :subTitle="date(info.media.timestamp)")
      mu-float-button.fab(icon="edit", @click="edit", mini="true")
      img(:src="info.media.src")

    // BLOCKS
    template(v-for="block in info.content")
      mu-card-title(:title="block.title", :subTitle="block.subtitle")
      
      // METADATA
      mu-card-text(v-if="block.metadata")
        .metadata
          mu-chip.chip(v-for="data in block.metadata")
            span.key {{ data.key }}
            span.value {{ data.value }}

      // POSITIONS
      v-map#positions(v-if="block.positions", :zoom="map.zoom", :center="map.center", ref="positions")
        v-tilelayer(:url="map.url")
        v-marker(v-for="position in block.positions", :lat-lng="position")
        v-polyline(:lat-lngs="block.positions", color="steelblue")
        v-icondefault(image-path="/img/")

      // GALLERY
      .container(v-if="block.gallery")
        mu-grid-list.gallery
          mu-grid-tile(v-for='image, index in block.gallery', :key='index')
            img(:src='image.src')
            span(slot='title') {{ image.title }}
            span(slot='subTitle') {{ image.subtitle }}
            mu-icon-button(icon='remove_red_eye', slot='action', @click="show(image)")

      // FILES
      .container(v-if="block.files")
        mu-grid-list.files
          mu-grid-tile(v-for='file, index in block.files', :key='index')
            img(:src='file.src')
            span(slot='title') {{ file.title }}
            span(slot='subTitle') {{ file.subtitle }}
            mu-icon-button(icon='remove_red_eye', slot='action', @click="show(file)")

      // WEATHER
      mu-card.weather-card(v-if="block.weather")
        mu-card-media(:title="block.weather.title", :subTitle="block.weather.subtitle")
          img.weather(:src="block.weather.src")

        mu-card-text
          .metadata
            mu-chip.chip(v-for="data in block.weather.metadata")
              span.key {{ data.key }}
              span.value {{ data.value }}
</template>

<script>
  import store from '../vuex/store'
  import moment from 'moment'
  import Vue2Leaflet from 'vue2-leaflet'

  export default {
    name: 'InfoCard',
    props: ['info'],
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'v-marker': Vue2Leaflet.Marker,
      'v-icondefault': Vue2Leaflet.IconDefault,
      'v-polyline': Vue2Leaflet.Polyline
    },
    methods: {
      show (item) {
        store.commit('setDialog', item)
      },
      date (timestamp) {
        return moment.unix(timestamp).format('DD/MM/YYYY HH:mm:ss')
      }
    },
    computed: {
      map () {
        return store.state.map
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .info-card
    .mu-avatar
      background-color transparent
    .container
      display flex
      flex-wrap wrap
      justify-content space-around
      .gallery
      .files
        margin 0 !important
        display flex
        flex-wrap nowrap
        overflow-x auto
    .media
      .fab
        position absolute
        right 10px
        top 10px
    #positions
      width 100%
      height 250px
    .weather-card
      img.weather
        padding 0 50px
    .metadata
      display flex
      flex-direction row
      justify-content flex-start
      align-items left
      flex-wrap wrap
      .chip
        margin 1px
        padding 0
        border-radius 20px
        .key
          background-color grey
          color white
          border-radius inherit
        .value
          font-weight bold
        .key
        .value
          padding 0 10px
          font-size 12px
</style>