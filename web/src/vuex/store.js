import Vue from 'vue'
import Vuex from 'vuex'

import incident from '../factories/incident'
import resource from '../factories/resource'
import infrastructure from '../factories/infrastructure'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    message: null,
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
          { name: 'Activos', radio: false, checked: true, items: incident.array(5) },
          { name: 'Inactivos', radio: false, checked: true, items: incident.array(5) }
        ] },
        { name: 'Recursos', radio: false, checked: true, layers: [
          { name: 'Activos', radio: false, checked: true, items: resource.array(5) },
          { name: 'Inactivos', radio: false, checked: true, items: resource.array(5) }
        ] },
        { name: 'Infraestructuras', radio: false, checked: true, layers: [
          { name: 'Bases', radio: false, checked: true, items: infrastructure.array(5) }
        ] }
      ] }
    ]
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    setMessage (state, message) {
      state.message = null // to force a change for watchers
      state.message = message
    },
    setDialog (state, dialog) {
      state.dialog = null // to force a change for watchers
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
    setMap (state, map) {
      state.map.L = map
    },
    setCenter (state, center) {
      state.map.L.panTo(center)
    }
  }
})

export default vuex
