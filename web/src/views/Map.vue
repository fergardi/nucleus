<template lang="pug">
  .leaflet-map
    loading-progress(:loading="loading")

    v-map#map(:zoom="map.zoom", :center="map.center", :min-zoom="map.min", :max-zoom="map.max", ref="map")
      v-tilelayer(:url="map.url")
      v-group(v-for="layer, index1 in filtered", v-if="layer.checked")
        v-marker(v-for="item, index2 in layer.items", :lat-lng="item.coordinates", :icon="icon(item.avatar.src, color(item))", @l-click="select(item, index1, index2, layer)")
    
    #google

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
        loading: true
      }
    },
    mounted () {
      const initial = Date.now()
      firebase.ref('layers').once('value', snapshot => {
        console.log('loaded in ' + ((Date.now() - initial) / 1000) + ' seconds')
        store.commit('setMessage', 'Datos cargados')
        store.commit('setToast', true)
        this.loading = false
        store.commit('setMap', this.$refs.map.mapObject) // store the leaflet map into vuex
        store.state.map.L.zoomControl.remove()
      })

      /* eslint-disable */
      const map = new google.maps.Map(document.getElementById('google'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(42.601822, -5.581515),
        zoom: 11
      })

      const service = new google.maps.places.PlacesService(map);

      const cities = [
        { name: 'León', center: { lat: 42.601822, lng: -5.581515 } }
      ]

      const types = [
        { name: 'Restaurantes', types: ['restaurant'], icon: 'https://image.flaticon.com/icons/svg/235/235834.svg', image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327' },
        { name: 'Panaderías', types: ['bakery'], icon: 'https://image.flaticon.com/icons/svg/201/201693.svg', image: 'https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5' },
        { name: 'Floristerías', types: ['florist'], icon: 'https://image.flaticon.com/icons/svg/435/435374.svg', image: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e' },
        { name: 'Tiendas', types: ['clothing_store', 'shoe_store'], icon: 'https://image.flaticon.com/icons/svg/237/237063.svg', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050' },
        { name: 'Carnicerías', types: ['food'], keyword: 'carnicería', icon: 'https://image.flaticon.com/icons/svg/201/201727.svg', image: 'https://images.unsplash.com/photo-1446847698474-a2db2756fe2a' },
        { name: 'Pescaderías', types: ['food'], keyword: 'pescadería', icon: 'https://image.flaticon.com/icons/svg/444/444149.svg', image: 'https://images.unsplash.com/photo-1470181446350-2d7024be15be' },
        { name: 'Quioscos', types: ['store'], keyword: 'quiosco', icon: 'https://image.flaticon.com/icons/svg/321/321680.svg', image: 'https://images.unsplash.com/photo-1484451638740-e4bfa5fac525' }
      ]

      var i = 0

      types.forEach((type) => {
        this.$firebaseRefs.layers.child(type.name.toLowerCase()).set({
          checked: true,
          src: type.icon,
          name: type.name.toLowerCase(),
          opened: false
        })
        cities.forEach((city) => {
          service.radarSearch({
            location: new google.maps.LatLng(city.center.lat, city.center.lng),
            radius: 500,
            types: type.types,
            keyword: type.keyword,
            name: type.keyword
          }, (results, status) => {
            results.forEach((result, index) => {
              ((index) => {
                setTimeout(() => {
                  if (result) service.getDetails(result, (info, status) => {
                    if (info) {
                      this.$firebaseRefs.layers.child(type.name.toLowerCase()).child('items').push({
                        coordinates: { lat: info.geometry.location.lat(), lng: info.geometry.location.lng() },
                        avatar: {
                          color: 'red',
                          title: info.name,
                          subtitle: info.formatted_address + ', (' + info.formatted_phone_number + ')',
                          src: type.icon
                        },
                        media: {
                          title: info.name,
                          subtitle: info.formatted_address + ', (' + info.formatted_phone_number + ')',
                          src: info.photos && info.photos.length ? info.photos[0].getUrl({ 'maxWidth': 800, 'maxHeight': 600 }) : type.image
                        },
                        description: 'Muy lejos, más allá de las montañas de palabras, alejados de los países de las vocales y las consonantes, viven los textos simulados. Viven aislados en casas de letras, en la costa de la semántica, un gran océano de lenguas.'
                      })
                    } else {
                      console.log('ERROR: ', status)
                    }
                  })
                }, i++ * 1000)
              })(index)
            })
          })
        })
      })
      /* eslint-enable */
    },
    methods: {
      select (item, index1, index2, layer) {
        store.commit('setInfo', { collection: layer.name, index: index1, item: index2 })
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
      geo (event) {
        console.log(event.latlng)
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
  #google
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