<template lang="pug">
  .data-stepper
    mu-stepper(:activeStep="step", orientation="vertical", :linear="true")
    
      mu-step
        mu-step-label
          span Seleccione el tipo del nuevo elemento a agregar
        mu-step-content
          mu-select-field(v-model="selected", label="Tipo", :icon="selected ? 'done' : 'close'")
            mu-menu-item(v-for="element in elements", :title="element.title", :value="element")
          .buttons
            mu-raised-button(label="Cancelar", @click="close")
            mu-raised-button(label="Siguiente", @click="next", primary, :disabled="!selected")

      mu-step
        mu-step-label
          span Seleccione la posición actual del nuevo elemento
        mu-step-content
          v-map.location(:zoom="10", :center="[coordinates.lat, coordinates.lng]", ref="location", "@l-click="point($event)")
            v-tilelayer(url="//{s}.tile.osm.org/{z}/{x}/{y}.png")
            v-marker(:lat-lng="[coordinates.lat, coordinates.lng]")
            v-icondefault(image-path="/img/")
          form.coordinates
            mu-text-field(type="number" label="Latitud", v-model="coordinates.lat", required)
            mu-text-field(type="number" label="Longitud", v-model="coordinates.lng", required)
          .buttons
            mu-raised-button(label="Anterior", @click="previous")
            mu-raised-button(label="Siguiente", @click="next", primary, :disabled="!coordinates")

      mu-step
        mu-step-label
          span Introduzca los datos asociados al nuevo elemento
        mu-step-content
          form.form(v-if="selected")
            template(v-for="field in selected.data")
              mu-text-field(:label="field.name", v-model="field.value", v-if="field.type === 'text'", :required="field.required", :icon="field.value ? 'done' : 'close'")
              mu-text-field(:label="field.name", v-model="field.value", v-if="field.type === 'textarea'", :required="field.required", :multiLine="true", :rows="5", :icon="field.value ? 'done' : 'close'")
              mu-switch(:label="field.name", v-model="field.checked", v-if="field.type === 'switch'")
              mu-radio(:label="field.name", v-model="field.checked", v-if="field.type === 'radio'")
              mu-checkbox(:label="field.name", v-model="field.checked", v-if="field.type === 'checkbox'")
          .buttons
            mu-raised-button(label="Anterior", @click="previous")
            mu-raised-button(label="Finalizar", @click="next", primary, :disabled="validate")

    .buttons(v-if="finished")
      mu-raised-button(label="Reiniciar", @click="reset")
      mu-raised-button(label="Guardar", @click="send", primary)
</template>

<script>
  import store from '../vuex/store'
  import Vue2Leaflet from 'vue2-leaflet'

  export default {
    name: 'DataStepper',
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'v-marker': Vue2Leaflet.Marker,
      'v-icondefault': Vue2Leaflet.IconDefault
    },
    data () {
      return {
        step: 0,
        selected: null,
        coordinates: {
          lat: 42.58,
          lng: -5.60
        },
        elements: [
          { type: 'incident', title: 'Incidente', data: [
            { name: 'Nombre', type: 'text', required: true, value: null },
            { name: 'Tipo', type: 'select', required: true, value: null }
          ] },
          { type: 'resource', title: 'Recurso', data: [
            { name: 'Nombre completo', type: 'text', required: true, value: null },
            { name: 'Checkbox', type: 'checkbox', required: true, value: true },
            { name: 'Radio', type: 'radio', required: true, value: true },
            { name: 'Switch', type: 'switch', required: true, value: true }
          ] },
          { type: 'infrastructure', title: 'Infraestructura', data: [
            { name: 'Nombre', type: 'text', required: true, value: null },
            { name: 'Descripción', type: 'textarea', required: true, value: null }
          ] }
        ]
      }
    },
    methods: {
      next () {
        this.step++
      },
      previous () {
        this.step--
      },
      reset () {
        this.step = 0
        this.selected = null
      },
      send () {
        // TODO
        this.close()
        store.commit('resetMessage')
        store.commit('setMessage', 'Saved succesfully!')
      },
      close () {
        this.reset()
        store.commit('togglePanel')
      },
      point (ev) {
        this.coordinates = { lat: ev.latlng.lat, lng: ev.latlng.lng }
      }
    },
    computed: {
      validation () {
        return true // TODO
      },
      finished () {
        return this.step > 2
      }
    }
  }
</script>

<style lang="stylus">
  .data-stepper
    width 100%
    height 100%
    overflow auto
    display flex
    justify-content center
    align-items center
    flex-direction column
    .mu-stepper
      .mu-step-content-inner
      .form
        display flex
        flex-direction column
        align-items flex-start
      .location
        width 100%
        height 250px
      .coordinates
        display flex
        flex-direction row
        .mu-text-field
          width 50%
    .buttons
      margin-top 20px
      width 100%
      display flex
      justify-content center
      align-items center
      button
        margin 0 5px
</style>