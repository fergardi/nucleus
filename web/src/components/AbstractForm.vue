<template lang="pug">
  form.abstract-form
    mu-flexbox(wrap="wrap")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Tipo y nombre", subTitle="Nuevo elemento")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188234.svg", slot="avatar")
          mu-card-text
            mu-select-field(v-model="selected", label="Tipo", :fullWidth="true")
              mu-menu-item(v-for="type in collections", :title="type.name", :value="type")
            mu-text-field(v-model="name", label="Nombre", :fullWidth="true")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Imagen e icono", subTitle="Agregar imágenes")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188235.svg", slot="avatar")
          mu-card-text
            mu-text-field(v-model="icon", label="Icono", :fullWidth="true")
            mu-text-field(v-model="image", label="Imagen", :fullWidth="true")
          mu-card-header(:title="name", subTitle="Icono asociado")
            mu-avatar(:src="icon", slot="avatar")
          mu-card-media(:title="name", subTitle="Imagen asociada")
            img(:src="image")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Posición actual", subTitle="Coordenadas")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188236.svg", slot="avatar")
          mu-card-text
            v-map#location(:zoom="10", :center="[coordinates.lat, coordinates.lng]", ref="location", @l-click="point($event)")
              v-tilelayer(:url="map.url")
              v-marker(:lat-lng="[coordinates.lat, coordinates.lng]")
              v-icondefault(image-path="/img/")
            .coordinates
              mu-text-field(type="number" label="Latitud", v-model="coordinates.lat")
              mu-text-field(type="number" label="Longitud", v-model="coordinates.lng")
            mu-text-field(v-model="coordinates.address", label="Buscar", :fullWidth="true")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Datos asociados", subTitle="Información completa")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188237.svg", slot="avatar")
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
              mu-raised-button(label="Terminar", @click="save", primary, :disabled="validate")
</template>

<script>
  import store from '../vuex/store'
  import Vue2Leaflet from 'vue2-leaflet'
  import firebase from '../services/firebase'

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
        selected: null,
        name: 'Nombre',
        icon: 'https://image.flaticon.com/icons/svg/234/234449.svg',
        image: 'https://images.unsplash.com/photo-1474600056930-615c3d706456',
        coordinates: {
          lat: 42.58,
          lng: -5.60,
          address: ''
        }
      }
    },
    firebase: {
      collections: firebase.ref('collections')
    },
    watch: {
      add () {
        this.$refs.location.mapObject.invalidateSize(false)
      }
    },
    created () {
      this.coordinates.lat = this.map.coordinates[0]
      this.coordinates.lng = this.map.coordinates[1]
    },
    methods: {
      point (ev) {
        this.coordinates = { lat: ev.latlng.lat.toFixed(5), lng: ev.latlng.lng.toFixed(5) }
      },
      cancel () {
        // TODO
        store.commit('toggleAdd')
      },
      save () {
        this.$firebaseRefs.collections.push()
        store.commit('resetMessage')
        store.commit('setMessage', 'Guardado correctamente')
        store.commit('toggleAdd')
      }
    },
    computed: {
      add () {
        return store.state.add
      },
      map () {
        return store.state.map
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
          margin 5px 0px !important
</style>
