import Vue from 'vue'
import VueRouter from 'vue-router'
import MuseUI from 'muse-ui'

import moment from 'moment'

import App from './App.vue'
import Map from './views/Map.vue'

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
  return moment(parseInt(timestamp)).format('D/M/YYYY HH:mm:ss')
})

// main app
let Main = Vue.component('app', App) // eslint-disable-line
Main = new Main({
  el: '#app',
  router
})
