<template lang="pug">
  .tool-box
    mu-icon-button(icon="home", @click="goHome")
    mu-icon-button(icon="play_arrow", v-if="!tour", @click="toggleTour")
    mu-icon-button.progress(v-if="tour", @click="toggleTour")
      mu-circular-progress(mode="determinate", :strokeWidth="2", :size="20", :value="value", color="white")
    mu-icon-button(icon="zoom_out_map", @click="fullScreen")
</template>

<script>
  import store from '../vuex/store'
  import firebase from '../services/firebase'

  export default {
    name: 'ToolBox',
    data () {
      return {
        value: 0,
        timer: null,
        timeout: 5000,
        tick: 1000
      }
    },
    created () {
      store.watch((state) => state.tour, () => {
        this.value = 0
        if (this.tour) {
          this.timer = setInterval(() => {
            this.value += 100 / (this.timeout / this.tick)
            if (this.value > 100) {
              this.value = 0
              var item = this.getRandom()
              if (!store.state.right) store.commit('toggleRight')
              store.commit('setInfo', item)
              store.commit('setCenter', this.layers[item.index].items[item.item].coordinates)
            }
          }, this.tick)
        } else {
          clearInterval(this.timer)
        }
      })
    },
    firebase: {
      layers: firebase.ref('layers')
    },
    methods: {
      toggleTour () {
        store.commit('toggleTour')
      },
      goHome () {
        store.commit('setCenter', this.map.center)
      },
      getRandom () {
        var layer = Math.floor(Math.random() * this.layers.length)
        var item = Object.keys(this.layers[layer].items)[Math.floor(Math.random() * Object.keys(this.layers[layer].items).length)]
        return { collection: this.layers[layer].name, index: layer, item: item }
      },
      fullScreen () {
        if (store.state.left) store.commit('toggleLeft')
        if (store.state.right) store.commit('toggleRight')
      }
    },
    computed: {
      tour () {
        return store.state.tour
      },
      map () {
        return store.state.map
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .tool-box
    display inline-flex
    justify-content center
    align-items center
    .progress
      line-height 0
</style>