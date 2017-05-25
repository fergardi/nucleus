import Vue from 'vue'
import Vuex from 'vuex'

import incident from '../factories/incident'
import resource from '../factories/resource'
import infrastructure from '../factories/infrastructure'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    panel: false,
    message: null,
    form: {},
    dialog: {},
    info: null,
    left: false,
    right: false,
    checked: true,
    tour: false,
    map: {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      center: [42.58, -5.60],
      zoom: 13,
      iconSize: 40, // px, even
      L: null // leaflet
    },
    layers: [
      { name: 'Capas Operacionales', radio: false, checked: true, layers: [
        { name: 'Incidentes', radio: false, checked: true, layers: [
          { name: 'Activos', radio: false, checked: true, items: incident.array(100) },
          { name: 'Inactivos', radio: false, checked: true, items: incident.array(100) }
        ] },
        { name: 'Recursos', radio: false, checked: true, layers: [
          { name: 'Activos', radio: false, checked: true, items: resource.array(100) },
          { name: 'Inactivos', radio: false, checked: true, items: resource.array(100) }
        ] },
        { name: 'Infraestructuras', radio: false, checked: true, layers: [
          { name: 'Bases', radio: false, checked: true, items: infrastructure.array(100) }
        ] }
      ] }
    ]
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    resetMessage (state) {
      state.message = null // to force a change for watchers
    },
    setMessage (state, message) {
      state.message = message
    },
    resetDialog (state) {
      state.dialog = null // to force a change for watchers
    },
    setDialog (state, dialog) {
      state.dialog = dialog
    },
    toggleTour (state) {
      state.tour = !state.tour
    },
    toggleLeft (state) {
      state.left = !state.left
    },
    toggleRight (state) {
      state.right = !state.right
    },
    togglePanel (state) {
      state.panel = !state.panel
    },
    setMap (state, map) {
      state.map.L = map
    },
    setCenter (state, center) {
      state.map.L.panTo(center)
    }
  }
})

export default vuex
