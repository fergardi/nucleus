<template lang="pug">
  form.abstract-form
    mu-flexbox
      mu-flexbox-item
        mu-card
          mu-card-header(title="Seleccione el tipo del elemento", subTitle="Nuevo elemento")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188234.svg", slot="avatar")
          mu-card-text
            mu-select-field(v-model="selected", label="Tipo", :fullWidth="true")
              mu-menu-item(v-for="element in elements", :title="element.title", :value="element")
      mu-flexbox-item
        mu-card
          mu-card-header(title="Seleccione la posición actual", subTitle="Coordenadas")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188235.svg", slot="avatar")
          mu-card-text
            v-map#location(:zoom="10", :center="[coordinates.lat, coordinates.lng]", ref="location", @l-click="point($event)")
              v-tilelayer(url="//{s}.tile.osm.org/{z}/{x}/{y}.png")
              v-marker(:lat-lng="[coordinates.lat, coordinates.lng]")
              v-icondefault(image-path="/img/")
            .coordinates
              mu-text-field(type="number" label="Latitud", v-model="coordinates.lat", required)
              mu-text-field(type="number" label="Longitud", v-model="coordinates.lng", required)
      mu-flexbox-item
        mu-card
          mu-card-header(title="Introduzca los datos asociados", subTitle="Información completa")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188236.svg", slot="avatar")
          mu-card-text(v-if="selected")
            .data(v-for="field in selected.data")
              mu-select-field(v-model="field.value", :label="field.name", v-if="field.type === 'select'", :fullWidth="true")
                mu-menu-item(v-for="option in field.options", :title="option.name", :value="option")
              mu-text-field(:label="field.name", v-model="field.value", v-if="field.type === 'text'", :required="field.required", :fullWidth="true")
              mu-text-field(:label="field.name", v-model="field.value", v-if="field.type === 'textarea'", :required="field.required", :multiLine="true", :rows="5", :fullWidth="true")
              mu-switch(:label="field.name", v-model="field.checked", v-if="field.type === 'switch'")
              mu-radio(:label="field.name", v-model="field.checked", v-if="field.type === 'radio'")
              mu-checkbox(:label="field.name", v-model="field.checked", v-if="field.type === 'checkbox'")
      mu-flexbox-item
        mu-card
          mu-card-header(title="Guardar y enviar", subTitle="Confirmar")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188237.svg", slot="avatar")
          mu-card-text
            .buttons
              mu-raised-button(label="Cancelar", @click="cancel", secondary)
              mu-raised-button(label="Terminar", @click="save", primary, :disabled="validate")
</template>

<script>
  import store from '../vuex/store'
  import Vue2Leaflet from 'vue2-leaflet'

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
        coordinates: {
          lat: 42.58,
          lng: -5.60
        },
        elements: [
          { type: 'incident', title: 'Incidente', data: [
            { name: 'Texto', type: 'text', required: true, value: null },
            { name: 'Selección', type: 'select', required: true, value: null, options: [
              { name: 'Primera', value: 'primera' },
              { name: 'Segunda', value: 'segunda' }
            ] }
          ] },
          { type: 'resource', title: 'Recurso', data: [
            { name: 'Texto', type: 'text', required: true, value: null },
            { name: 'Checkbox', type: 'checkbox', required: true, value: true },
            { name: 'Radio', type: 'radio', required: true, value: true },
            { name: 'Switch', type: 'switch', required: true, value: true }
          ] },
          { type: 'infrastructure', title: 'Infraestructura', data: [
            { name: 'Texto', type: 'text', required: true, value: null },
            { name: 'Textarea', type: 'textarea', required: true, value: null }
          ] }
        ]
      }
    },
    created () {
      this.selected = this.elements[0]
    },
    watch: {
      panel () {
        this.$refs.location.mapObject.invalidateSize(false)
      }
    },
    methods: {
      point (ev) {
        this.coordinates = { lat: ev.latlng.lat.toFixed(5), lng: ev.latlng.lng.toFixed(5) }
      },
      cancel () {
        // TODO
        store.commit('togglePanel')
      },
      save () {
        // TODO
        store.commit('resetMessage')
        store.commit('setMessage', 'Guardado')
        store.commit('togglePanel')
      }
    },
    computed: {
      panel () {
        return store.state.panel
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
        margin 0px 5px !important
        width 100%
    .coordinates
    .buttons
      display flex
      justify-content center
      align-items center
      .mu-raised-button
        margin 0 5px
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
