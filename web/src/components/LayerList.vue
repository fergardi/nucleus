<template lang="pug">
  .layer-list
    mu-list-item(v-for="layer in layers", :title="layer.name", slot="nested")
      mu-switch(v-if="layer.radio", v-model="layer.checked", slot="right")
      mu-checkbox(v-else, v-model="layer.checked", slot="right")
      //layer-list(:layers="layer.layers")
      mu-list-item(v-for="l in layer.layers", :title="l.name", slot="nested")
        mu-switch(v-if="l.radio", v-model="l.checked", slot="right")
        mu-checkbox(v-else, v-model="l.checked", slot="right")
        mu-list-item(v-for="la in l.layers", :title="la.name", slot="nested")
          mu-switch(v-if="la.radio", v-model="la.checked", slot="right")
          mu-checkbox(v-else, v-model="la.checked", slot="right")
</template>

<script>
  export default {
    name: 'LayerList',
    props: ['layers'],
    methods: {
      toggle (layer) {
        layer.checked = !layer.checked
        // if (layer.layers) layer.layers.forEach((children) => this.toggle(children))
      },
      i18n (string) {
        return string // TODO
      }
    }
  }
</script>

<style lang="stylus">
</style>
