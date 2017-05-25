<template lang="pug">
  .tool-box
    mu-icon-button(icon="home", @click="goHome")
    mu-icon-button(icon="fast_rewind", @click="previousTour")
    mu-icon-button(icon="play_arrow", v-if="!tour", @click="toggleTour")
    mu-icon-button.progress(v-if="tour", @click="toggleTour")
      mu-circular-progress(mode="determinate", :strokeWidth="2", :size="20", :value="value", color="white")
    mu-icon-button(icon="fast_forward", @click="nextTour")
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
        index: 0,
        timeout: 5000,
        tick: 1000
      }
    },
    created () {
      store.watch((state) => state.tour, () => {
        this.value = 0
        if (this.tour && !store.state.right) store.commit('toggleRight')
        if (!store.state.info) {
          store.commit('setInfo', this.layers[0].layers[0].layers[0].items[this.index])
          store.commit('setCenter', this.layers[0].layers[0].layers[0].items[this.index].coordinates)
        }
        if (this.tour) {
          this.timer = setInterval(() => {
            this.value += 100 / (this.timeout / this.tick)
            if (this.value > 100) {
              this.value = 0
              this.index = this.index + 1 >= this.layers[0].layers[0].layers[0].items.length ? 0 : this.index + 1
              store.commit('setInfo', this.layers[0].layers[0].layers[0].items[this.index])
              store.commit('setCenter', this.layers[0].layers[0].layers[0].items[this.index].coordinates)
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
      previousTour () {
        if (this.tour) store.commit('toggleTour')
        this.index = this.index - 1 < 0 ? this.layers[0].layers[0].layers[0].items.length - 1 : this.index - 1
        store.commit('setInfo', this.layers[0].layers[0].layers[0].items[this.index])
        store.commit('setCenter', this.layers[0].layers[0].layers[0].items[this.index].coordinates)
      },
      nextTour () {
        if (this.tour) store.commit('toggleTour')
        this.index = this.index + 1 >= this.layers[0].layers[0].layers[0].items.length ? 0 : this.index + 1
        store.commit('setInfo', this.layers[0].layers[0].layers[0].items[this.index])
        store.commit('setCenter', this.layers[0].layers[0].layers[0].items[this.index].coordinates)
      },
      goHome () {
        store.commit('setCenter', this.map.center)
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