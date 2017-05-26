import Vue from 'vue'
import Vuex from 'vuex'

import incident from '../factories/incident'
import resource from '../factories/resource'
import infrastructure from '../factories/infrastructure'

var copy = function (object) {
  return Object.assign({}, object)
}

Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    add: false,
    edit: false,
    message: null,
    form: {},
    dialog: {},
    search: '',
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
      { name: 'Incidentes', radio: false, checked: true, opened: false, items: incident.array(10) },
      { name: 'Recursos', radio: false, checked: true, opened: false, items: resource.array(10) },
      { name: 'Infraestructuras', radio: false, checked: true, opened: false, items: infrastructure.array(10) }
    ]
  },
  getters: {
    filtered: (state) => {
      return state.search.toLowerCase() === '' ? state.layers : state.layers.map(copy).filter(function recursive (item) {
        return item.name && item.name.toLowerCase().includes(state.search.toLowerCase()) || item.avatar && item.avatar.title.toLowerCase().includes(state.search.toLowerCase()) || item.items && (item.items = item.items.map(copy).filter(recursive)).length
      })
    }
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    updateSearch (state, search) {
      state.search = search
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
    toggleEdit (state) {
      state.add = false
      state.edit = !state.edit
    },
    toggleAdd (state) {
      state.edit = false
      state.add = !state.add
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
