<template lang="pug">
  form.marker-form
    mu-flexbox

      mu-flexbox-item
        mu-card
          mu-card-header(title="Tipo y nombre", subTitle="Nuevo elemento")
            mu-avatar(src="https://image.flaticon.com/icons/svg/337/337308.svg", slot="avatar")
          mu-card-text
            mu-select-field(v-model="selected", label="Tipo", :fullWidth="true")
              mu-menu-item(v-for="layer in layers", :title="layer.name | capitalize", :value="layer")
            mu-text-field(v-model="name", label="Nombre", :fullWidth="true")
            mu-text-field(v-model="home", label="Dirección", :fullWidth="true")
            mu-text-field(v-model="description", label="Descripción", :fullWidth="true", :multiLine="true", :rows="3", :rowsMax="6")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Imagen", subTitle="Agregar imágen")
            mu-avatar(src="https://image.flaticon.com/icons/svg/272/272881.svg", slot="avatar")
          mu-card-text
            mu-text-field(v-model="image", label="Imagen", :fullWidth="true")
          mu-card-media(:title="name", :subTitle="home")
            img(:src="image")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Posición actual", subTitle="Coordenadas")
            mu-avatar(src="https://image.flaticon.com/icons/svg/237/237150.svg", slot="avatar")
          mu-card-text
            v-map#location(:zoom="map.zoom", :min-zoom="map.min", :max-zoom="map.max", :center="[coordinates.lat, coordinates.lng]", ref="location", @l-click="point($event)")
              v-tilelayer(:url="map.url")
              v-marker(:lat-lng="[coordinates.lat, coordinates.lng]", :icon="icon(selected.src, 'red')")
              v-icondefault(image-path="/img/")
            .coordinates
              mu-text-field(type="number" label="Latitud", v-model="coordinates.lat")
              mu-text-field(type="number" label="Longitud", v-model="coordinates.lng")
            mu-auto-complete(v-model="address", @input="find", :dataSource="addresses", :fullWidth="true", :openOnFocus="true", label="Buscar", :maxSearchResults="5", @select="locate")
          mu-card-text
            .buttons
              mu-raised-button(label="Cancelar", @click="cancel")
              mu-raised-button(label="Terminar", @click="save", primary, :disabled="!valid")
</template>

<script>
  import moment from 'moment'
  import store from '../vuex/store'
  import Vue2Leaflet from 'vue2-leaflet'
  import firebase from '../services/firebase'

  export default {
    name: 'MarkerForm',
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'v-marker': Vue2Leaflet.Marker,
      'v-icondefault': Vue2Leaflet.IconDefault
    },
    data () {
      return {
        selected: {
          name: '',
          src: 'https://image.flaticon.com/icons/svg/148/148766.svg'
        },
        name: 'Nombre',
        home: 'Dirección',
        description: 'Muy lejos, más allá de las montañas de palabras, alejados de los países de las vocales y las consonantes, viven los textos simulados. Viven aislados en casas de letras, en la costa de la semántica, un gran océano de lenguas. Un riachuelo llamado Pons fluye por su pueblo y los abastece con las normas necesarias.',
        image: 'https://images.unsplash.com/photo-1474600056930-615c3d706456',
        coordinates: {
          lat: 42.58,
          lng: -5.60
        },
        address: '',
        places: []
      }
    },
    firebase: {
      layers: firebase.ref('layers')
    },
    watch: {
      add () {
        this.$refs.location.mapObject.invalidateSize(false)
      }
    },
    created () {
      this.coordinates.lat = this.map.center[0]
      this.coordinates.lng = this.map.center[1]
    },
    methods: {
      point (ev) {
        this.coordinates = { lat: ev.latlng.lat.toFixed(5), lng: ev.latlng.lng.toFixed(5) }
      },
      locate (center) {
        this.coordinates = center.value
      },
      cancel () {
        store.commit('toggleAdd')
      },
      clear () {
        this.coordinates.lat = this.map.center[0]
        this.coordinates.lng = this.map.center[1]
        this.address = ''
        this.places = []
      },
      find () {
        if (!this.address || !this.address.length) this.places = []
        this.map.G.geocode(this.address, matches => {
          this.places = matches
        })
      },
      save () {
        this.$firebaseRefs.layers.child(this.selected.name).child('items').push({
          coordinates: { lat: this.coordinates.lat, lng: this.coordinates.lng },
          avatar: {
            color: 'red',
            title: this.name,
            subtitle: this.home,
            src: this.selected.src
          },
          media: {
            title: this.selected.name,
            timestamp: Date.now() / 1000,
            src: this.image
          },
          description: this.description
        })
        .then((response) => {
          store.commit('setInfo', { collection: this.selected.name, index: this.layers.findIndex((layer) => layer.name === response.path.o[1]), item: response.path.o[3] })
          if (!store.state.right) store.commit('toggleRight')
          store.commit('setCenter', { lat: this.coordinates.lat, lng: this.coordinates.lng })
          store.commit('setMessage', 'Guardado correctamente')
          store.commit('setToast', true)
          store.commit('toggleAdd')
        })
      },
      icon (url, className) {
        return L.icon({ // eslint-disable-line
          iconUrl: url,
          iconSize: [this.map.iconSize, this.map.iconSize],
          iconAnchor: [this.map.iconSize / 2, this.map.iconSize / 2],
          className: 'marker ' + className
        })
      }
    },
    computed: {
      add () {
        return store.state.add
      },
      map () {
        return store.state.map
      },
      addresses () {
        return this.places.map((p) => { return { text: p.name, value: p.center } })
      },
      valid () {
        return this.name !== '' && this.selected.name !== ''
      },
      date () {
        return moment(parseInt(Date.now())).format('D/M/YYYY HH:mm:ss')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .marker-form
    .mu-flexbox
      flex-direction row
      align-items flex-start
      .mu-flexbox-item
        width 100%
        margin 5px !important
    .coordinates
    .buttons
      display flex
      justify-content flex-end
      align-items center
      .mu-raised-button + .mu-raised-button
        margin-left 5px
  #location
    height 250px
    width auto
  @media (max-width 768px)
    .marker-form
      .mu-flexbox
        flex-direction column !important
        .mu-flexbox-item
          width 100%
          margin 5px 0px !important
</style>
