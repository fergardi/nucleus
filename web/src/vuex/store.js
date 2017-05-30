import Vue from 'vue'
import Vuex from 'vuex'

import L from 'leaflet'
import 'leaflet-control-geocoder'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    add: false,
    edit: false,
    message: null,
    form: {},
    dialog: {},
    search: '',
    firebase: {
      collection: null,
      index: null
    },
    left: false,
    right: false,
    checked: true,
    tour: false,
    map: {
      url: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png',
      center: [42.58, -5.60],
      zoom: 13,
      min: 5,
      max: 18,
      iconSize: 40, // px, even
      L: null, // leaflet
      G: null // geocoder
    }
  },
  mutations: {
    setInfo (state, firebase) {
      state.firebase = firebase
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
      state.map.G = new L.Control.Geocoder.Nominatim({
        geocodingQueryParams: {
          countrycodes: 'ES'
        }
      })
    },
    setCenter (state, center) {
      state.map.L.panTo(center)
    }
  }
})

export default vuex
