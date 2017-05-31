<template lang="pug">
  form.abstract-form
    mu-flexbox

      mu-flexbox-item
        mu-card
          mu-card-header(title="Tipo y nombre", subTitle="Nuevo elemento")
            mu-avatar(src="https://image.flaticon.com/icons/svg/337/337308.svg", slot="avatar")
          mu-card-text
            mu-select-field(v-model="selected", label="Tipo", :fullWidth="true")
              mu-menu-item(v-for="layer in layers", :title="layer.name | capitalize", :value="layer")
            mu-text-field(v-model="name", label="Nombre", :fullWidth="true")
            mu-select-field(v-model="status", label="Estado", :fullWidth="true", :disabled="!selected.statuses.length")
              mu-menu-item(v-for="status in selected.statuses", :title="status.name", :value="status")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Imagen e icono", subTitle="Agregar imágenes")
            mu-avatar(src="https://image.flaticon.com/icons/svg/272/272881.svg", slot="avatar")
          mu-card-text
            mu-text-field(v-model="icon", label="Icono", :fullWidth="true")
            mu-text-field(v-model="image", label="Imagen", :fullWidth="true")
          mu-card-header(:title="name", :subTitle="status.name")
            mu-avatar.avatar(:src="icon", slot="avatar", :class="status.color")
          mu-card-media(:title="selected.name | capitalize", :subTitle="date")
            img(:src="image")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Posición actual", subTitle="Coordenadas")
            mu-avatar(src="https://image.flaticon.com/icons/svg/237/237150.svg", slot="avatar")
          mu-card-text
            v-map#location(:zoom="map.zoom", :min-zoom="map.min", :max-zoom="map.max", :center="[coordinates.lat, coordinates.lng]", ref="location", @l-click="point($event)")
              v-tilelayer(:url="map.url")
              v-marker(:lat-lng="[coordinates.lat, coordinates.lng]")
              v-icondefault(image-path="/img/")
            .coordinates
              mu-text-field(type="number" label="Latitud", v-model="coordinates.lat")
              mu-text-field(type="number" label="Longitud", v-model="coordinates.lng")
            mu-auto-complete(v-model="address", @input="find", :dataSource="addresses", :fullWidth="true", :openOnFocus="true", label="Buscar", :maxSearchResults="5", @select="locate")
            .buttons
              mu-raised-button(label="Reiniciar", @click="clear")
              mu-raised-button(label="Localizar", @click="geolocate", primary)

      mu-flexbox-item
        mu-card
          mu-card-header(title="Datos asociados", subTitle="Información completa")
            mu-avatar(src="https://image.flaticon.com/icons/svg/235/235248.svg", slot="avatar")
          mu-card-text(v-if="selected")
            .data(v-for="field in selected.data")
              mu-select-field(v-model="field.value", :label="field.name", v-if="field.type === 'select'", :fullWidth="true")
                mu-menu-item(v-for="option in field.options", :title="option.name", :value="option")
              mu-text-field(:label="field.name", v-model="field.value", v-if="field.type === 'text'", :fullWidth="true")
              mu-text-field(:label="field.name", v-model="field.value", v-if="field.type === 'number'", :fullWidth="true", type="number")
              mu-text-field(:label="field.name", v-model="field.value", v-if="field.type === 'textarea'", :multiLine="true", :rows="5", :fullWidth="true")
              mu-switch(:label="field.name", v-model="field.checked", v-if="field.type === 'switch'")
              mu-radio(:label="field.name", v-model="field.checked", v-if="field.type === 'radio'")
              mu-checkbox(:label="field.name", v-model="field.checked", v-if="field.type === 'checkbox'")
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
  import openweathermap from '../services/openweathermap'

  export default {
    name: 'AbstractForm',
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
          statuses: []
        },
        status: {
          name: 'Estado asociado',
          color: ''
        },
        name: 'Nombre',
        icon: 'https://image.flaticon.com/icons/svg/234/234449.svg',
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
      geolocate () {
        // this.coordinates =
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
        const coordinates = { lat: this.coordinates.lat, lng: this.coordinates.lng }
        openweathermap(coordinates)
        .then((weather) => {
          this.$firebaseRefs.layers.child(this.selected.name).child('items').push({
            coordinates: coordinates,
            avatar: {
              color: this.status.color,
              title: this.name,
              subtitle: this.status.name,
              src: this.icon
            },
            media: {
              title: this.selected.name,
              timestamp: Date.now() / 1000,
              src: this.image
            },
            data: this.selected.data,
            weather: weather
          })
          .then((response) => {
            store.commit('setInfo', { collection: this.selected.name, index: this.layers.findIndex((layer) => layer.name === response.path.o[1]), item: response.path.o[3] })
            if (!store.state.right) store.commit('toggleRight')
            store.commit('setCenter', { lat: this.coordinates.lat, lng: this.coordinates.lng })
            store.commit('resetMessage')
            store.commit('setMessage', 'Guardado correctamente')
            store.commit('toggleAdd')
          })
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
        return this.name !== '' && this.selected && this.status.color !== ''
      },
      date () {
        return moment(parseInt(Date.now())).format('D/M/YYYY HH:mm:ss')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .abstract-form
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
    .abstract-form
      .mu-flexbox
        flex-direction column !important
        .mu-flexbox-item
          width 100%
          margin 5px 0px !important
</style>
