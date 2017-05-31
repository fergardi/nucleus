<template lang="pug">
  mu-card.info-card(v-if="info")
    // HEADER
    //mu-card-header(v-if="info.avatar", :title="info.avatar.title", :subTitle="info.avatar.subtitle")
      mu-avatar.avatar(:src="info.avatar.src", slot="avatar", :class="info.avatar.color")

    // MEDIA
    mu-card-media.media(v-if="info.media", :title="info.avatar.title | capitalize", :subTitle="info.avatar.subtitle")
      mu-float-button.fab(icon="add", @click="shot", :mini="true")
      img(:src="info.media.src")

    // SHOTS
    mu-list.shots(v-if="info.shots")
      mu-list-item(v-for="shot in info.shots", :title="shot.name", :describeText="shot.description")
        mu-avatar(:src="shot.src", slot="leftAvatar")
        mu-badge(:content="shot.quantity.toString()", slot="right", circle, primary)

    // DATA
    mu-card-text(v-if="info.data")
      .metadata
        mu-chip.chip(v-for="data in info.data", :class="boolean(data.value)")
          span.key {{ data.name }}
          span.value {{ data.value | boolean }}

    // WEATHER
    mu-card-header(v-if="info.weather", :title="title(info.weather.degrees, info.weather.name)", :subTitle="date(info.weather.timestamp)")
      mu-avatar(:src="image(info.weather.src)", slot="avatar")
</template>

<script>
  import store from '../vuex/store'
  import moment from 'moment'
  import firebase from '../services/firebase'
  import openweathermap from '../services/openweathermap'
  import Vue2Leaflet from 'vue2-leaflet'

  export default {
    name: 'InfoCard',
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'v-marker': Vue2Leaflet.Marker,
      'v-icondefault': Vue2Leaflet.IconDefault,
      'v-polyline': Vue2Leaflet.Polyline
    },
    filters: {
      boolean (value) {
        return (value === true || value === false)
          ? value === true
            ? '✓'
            : '✗'
          : value
      }
    },
    created () {
      store.watch((state) => state.right, () => {
        if (store.state.right && parseInt(Date.now() / 1000) - this.info.weather.timestamp >= 7200) {
          openweathermap(this.info.coordinates)
          .then((weather) => {
            firebase.ref('layers').child(store.state.firebase.collection).child('items').child(store.state.firebase.item).child('weather').set(weather)
          })
        }
      })
    },
    firebase: {
      layers: firebase.ref('layers')
    },
    methods: {
      date (timestamp) {
        return moment.unix(timestamp).format('DD/MM/YYYY HH:mm:ss')
      },
      boolean (value) {
        return (value === true || value === false) ? value.toString() : ''
      },
      shot () {
        store.commit('toggleShot')
      },
      image (code) {
        switch (code) {
          case '01d':
            return 'https://image.flaticon.com/icons/svg/136/136723.svg'
          case '01n':
            return 'https://image.flaticon.com/icons/svg/136/136756.svg'
          case '02d':
            return 'https://image.flaticon.com/icons/svg/136/136716.svg'
          case '02n':
            return 'https://image.flaticon.com/icons/svg/136/136719.svg'
          case '03d':
            return 'https://image.flaticon.com/icons/svg/136/136701.svg'
          case '03n':
            return 'https://image.flaticon.com/icons/svg/136/136701.svg'
          case '04d':
            return 'https://image.flaticon.com/icons/svg/136/136701.svg'
          case '04n':
            return 'https://image.flaticon.com/icons/svg/136/136701.svg'
          case '09d':
            return 'https://image.flaticon.com/icons/svg/136/136714.svg'
          case '09n':
            return 'https://image.flaticon.com/icons/svg/136/136717.svg'
          case '10d':
            return 'https://image.flaticon.com/icons/svg/136/136714.svg'
          case '10n':
            return 'https://image.flaticon.com/icons/svg/136/136717.svg'
          case '11d':
            return 'https://image.flaticon.com/icons/svg/136/136729.svg'
          case '11n':
            return 'https://image.flaticon.com/icons/svg/136/136730.svg'
          case '13d':
            return 'https://image.flaticon.com/icons/svg/136/136715.svg'
          case '13n':
            return 'https://image.flaticon.com/icons/svg/136/136718.svg'
          case '50d':
            return 'https://image.flaticon.com/icons/svg/136/136723.svg'
          case '50n':
            return 'https://image.flaticon.com/icons/svg/136/136723.svg'
          default:
            return 'https://image.flaticon.com/icons/svg/136/136723.svg'
        }
      },
      title (degrees, name) {
        return degrees + 'º, ' + name.charAt(0).toUpperCase() + name.slice(1)
      }
    },
    computed: {
      map () {
        return store.state.map
      },
      info () {
        return this.layers
          ? store.state.firebase.index !== null && store.state.firebase.item !== null
            ? this.layers[store.state.firebase.index].items[store.state.firebase.item]
            : null
          : null
      }
    }
  }
</script>

<style lang="stylus">
  .mu-card-header-title
    padding-right 20px
  .shots
    .mu-item-wrapper
      border 2px dashed darkgrey
      margin 5px
    .mu-item .mu-item-right .mu-badge-container
      right 0
</style>

<style lang="stylus" scoped>
  .info-card
    box-shadow none !important
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
    .metadata
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
      flex-wrap wrap
      align-content center
      .chip
        margin 1px
        padding 0
        border-radius 20px
        &.true
          background-color green
          &:hover
            background-color darkgreen
        &.false
          background-color red
          &:hover
            background-color darkred
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