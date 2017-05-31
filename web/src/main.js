import Vue from 'vue'
import VueRouter from 'vue-router'
import MuseUI from 'muse-ui'
import VueFire from 'vuefire'

import moment from 'moment'

import App from './App.vue'
import Map from './views/Map.vue'

// firebase
Vue.use(VueFire)

// router
Vue.use(VueRouter)
// routes
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/map' },
    { path: '/map', component: Map },
    { path: '*', redirect: '/' }
  ]
})

// material
Vue.use(MuseUI)

// filter
Vue.filter('date', (timestamp) => {
  return moment(parseInt(timestamp)).format('DD/MM/YYYY HH:mm:ss')
})
Vue.filter('capitalize', (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
})
Vue.filter('i18n', (string) => {
  return string // TODO
})

// main app
let Main = Vue.component('app', App) // eslint-disable-line
Main = new Main({
  el: '#app',
  router
})
