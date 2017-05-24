<template lang="pug">
  .data-stepper
    mu-stepper(:activeStep="step", orientation="vertical", :linear="true")
    
      mu-step
        mu-step-label
          span Seleccione el tipo del nuevo elemento a agregar
        mu-step-content
          mu-select-field(v-model="selected")
            mu-menu-item(v-for="element in elements", :title="element.title", :value="element")
          .buttons
            mu-flat-button.demo-step-button(label="Cancelar", @click="close", secondary)
            mu-raised-button.demo-step-button(label="Siguiente", @click="next", primary, :disabled="!selected")

      mu-step
        mu-step-label
          span Seleccione la posición actual del nuevo elemento
        mu-step-content
          v-map.location(:zoom="10", :center="[42.58, -5.60]", ref="location", @l-click="point($event)")
            v-tilelayer(url="http://{s}.tile.osm.org/{z}/{x}/{y}.png")
            v-marker(:lat-lng="coordinates")
            v-icondefault(image-path="/img/")
          .buttons
            mu-flat-button.demo-step-button(label="Anterior", @click="previous", secondary)
            mu-raised-button.demo-step-button(label="Siguiente", @click="next", primary, :disabled="!coordinates")

      mu-step
        mu-step-label
          span Introduzca los datos asociados al nuevo elemento
        mu-step-content
          form.form(v-if="selected")
            template(v-for="field in selected.data")
              mu-text-field(:label="field.name", v-model="field.value", v-if="field.type === 'text'", :required="field.required")
              mu-text-field(:label="field.name", v-model="field.value", v-if="field.type === 'textarea'", :required="field.required", multiLine, :rows="5")
          .buttons
            mu-flat-button.demo-step-button(label="Anterior", @click="previous", secondary)
            mu-raised-button.demo-step-button(label="Finalizar", @click="next", primary)

    .buttons(v-if="finished")
      mu-flat-button.demo-step-button(label="Reiniciar", @click="reset", secondary)
      mu-raised-button.demo-step-button(label="Guardar", @click="send", primary)
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
        coordinates: [42.58, -5.60],
        elements: [
          { type: 'incident', title: 'Incidente', data: [
            { name: 'Nombre', type: 'text', required: true, value: null },
            { name: 'Tipo', type: 'select', required: true, value: null }
          ] },
          { type: 'resource', title: 'Recurso', data: [
            { name: 'Nombre completo', type: 'text', required: true, value: null },
            { name: 'Activo', type: 'checkbox', required: true, value: true }
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
      close () {
        store.commit('togglePanel')
      },
      point (ev) {
        this.coordinates = [ev.latlng.lat, ev.latlng.lng]
      }
    },
    computed: {
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
        height 50vh
    .buttons
      margin-top 20px
      width 100%
      display flex
      justify-content center
      align-items center
      button
        margin 0 5px
</style>