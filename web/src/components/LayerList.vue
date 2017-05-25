<template lang="pug">
  .layer-list
    mu-list-item.category(v-for="category in layers", :title="category.name", slot="nested", :toggleNested="true")
      mu-badge(:content="count(category)", slot="right")
      mu-switch(v-if="category.radio", v-model="category.checked", slot="right", @change="toggle(category)")
      mu-checkbox(v-else, v-model="category.checked", slot="right", @change="toggle(category)")

      mu-list-item.subcategory(v-for="subcategory in category.layers", :title="subcategory.name", slot="nested", :toggleNested="true")
        mu-badge(:content="count(subcategory)", slot="right")
        mu-switch(v-if="subcategory.radio", v-model="subcategory.checked", slot="right", @change="toggle(subcategory)")
        mu-checkbox(v-else, v-model="subcategory.checked", slot="right", @change="toggle(subcategory)")
        
        mu-list-item.layer(v-for="layer in subcategory.layers", :title="layer.name", slot="nested")
          mu-switch(v-if="layer.radio", v-model="layer.checked", slot="right")
          mu-checkbox(v-else, v-model="layer.checked", slot="right")
</template>

<script>
  export default {
    name: 'LayerList',
    props: ['layers'],
    methods: {
      toggle (layer, parent = true) {
        if (!parent) layer.checked = !layer.checked
        if (layer.layers) layer.layers.forEach((children) => this.toggle(children, false))
      },
      i18n (string) {
        return string // TODO
      },
      count (layer) {
        return layer.layers ? layer.layers.length : 0
      }
    }
  }
</script>

<style lang="stylus">
  .category
    padding-left 0px
    .subcategory
      padding-left 20px
      .layer
        padding-left 20px
  .mu-item
    .mu-item-right
      .mu-badge-container
        position absolute
        right 37px
      .mu-icon-button
        position absolute
        right 50px
</style>
