<template lang="pug">
  .layer-list
    mu-list-item.category(v-for="category in layers", :title="category.name", slot="nested")
      mu-switch(v-if="category.radio", v-model="category.checked", slot="right")
      mu-checkbox(v-else, v-model="category.checked", slot="right")

      mu-list-item.subcategory(v-for="subcategory in category.layers", :title="subcategory.name", slot="nested")
        mu-switch(v-if="subcategory.radio", v-model="subcategory.checked", slot="right")
        mu-checkbox(v-else, v-model="subcategory.checked", slot="right")
        
        mu-list-item.layer(v-for="layer in subcategory.layers", :title="layer.name", slot="nested")
          mu-switch(v-if="layer.radio", v-model="layer.checked", slot="right")
          mu-checkbox(v-else, v-model="layer.checked", slot="right")
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
  .category
    padding-left 0px
    .subcategory
      padding-left 10px
      .layer
        padding-left 20px
</style>
