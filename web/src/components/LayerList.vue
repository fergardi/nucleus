<template lang="pug">
  .layer-list
    mu-list-item(v-for="layer in layers", :title="layer.name", slot="nested")
      mu-switch(v-if="layer.radio", v-model="layer.checked", slot="right")
      mu-checkbox(v-else, v-model="layer.checked", slot="right")
      layer-list(:layers="layer.layers")
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
