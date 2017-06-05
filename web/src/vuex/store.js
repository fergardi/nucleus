import Vue from 'vue'
import Vuex from 'vuex'

import L from 'leaflet'
import 'leaflet-control-geocoder'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    add: false,
    edit: false,
    shot: false,
    message: null,
    toast: false,
    form: {},
    dialog: {},
    search: '',
    firebase: {
      collection: null,
      index: null,
      item: null
    },
    left: true,
    right: false,
    checked: true,
    docked: true,
    tour: false,
    settings: false,
    map: {
      url: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png',
      center: [42.60, -5.59],
      zoom: 14,
      min: 5,
      max: 18,
      iconSize: 50, // px, even
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
    setToast (state, toast) {
      state.toast = toast
    },
    setMessage (state, message) {
      state.message = message
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
      state.edit = !state.edit
    },
    toggleAdd (state) {
      state.add = !state.add
    },
    toggleShot (state) {
      state.shot = !state.shot
    },
    toggleSettings (state) {
      state.settings = !state.settings
    },
    setMap (state, map) {
      state.map.L = map
      state.map.G = new L.Control.Geocoder.Nominatim()
    },
    setCenter (state, center) {
      state.map.L.panTo(center)
    }
  }
})

export default vuex
