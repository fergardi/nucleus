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
    setMessage (state, message) {
      state.message = null // to force a change for watchers
      state.message = message
    },
    setDialog (state, dialog) {
      state.dialog = null // to force a change for watchers
      state.dialog = dialog
    },
    toggleLeft (state) {
      state.left = !state.left
    },
    toggleRight (state) {
      state.right = !state.right
    }
  }
})

export default vuex
