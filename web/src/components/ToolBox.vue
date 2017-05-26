<template lang="pug">
  .tool-box
    mu-icon-button(icon="home", @click="goHome")
    mu-icon-button(icon="play_arrow", v-if="!tour", @click="toggleTour")
    mu-icon-button.progress(v-if="tour", @click="toggleTour")
      mu-circular-progress(mode="determinate", :strokeWidth="2", :size="20", :value="value", color="white")
    mu-icon-button(icon="border_clear")
</template>

<script>
  import store from '../vuex/store'

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
        var item = this.getRandom()
        if (this.tour && !store.state.right) store.commit('toggleRight')
        if (!store.state.info) {
          store.commit('setInfo', item)
          store.commit('setCenter', item.coordinates)
        }
        if (this.tour) {
          this.timer = setInterval(() => {
            this.value += 100 / (this.timeout / this.tick)
            if (this.value > 100) {
              this.value = 0
              var item = this.getRandom()
              store.commit('setInfo', item)
              store.commit('setCenter', item.coordinates)
            }
          }, this.tick)
        } else {
          clearInterval(this.timer)
        }
      })
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
        return this.layers[layer].items[Math.floor(Math.random() * this.layers[layer].items.length)]
      }
    },
    computed: {
      tour () {
        return store.state.tour
      },
      layers () {
        return store.state.layers
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