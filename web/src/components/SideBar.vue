<template lang="pug">
  .side-bar
    mu-list(v-if="toc")
      mu-slider.slider(v-model='transparency')
      layer-list(:layers="layers")
    mu-list(v-if="card")
      info-card(:info="info")
</template>

<script>
  import LayerList from '../components/LayerList.vue'
  import InfoCard from '../components/InfoCard.vue'

  export default {
    name: 'SideBar',
    components: { LayerList, InfoCard },
    data () {
      return {
        toc: false,
        card: false,
        transparency: 50,
        layers: [
          { name: 'Categoría', radio: true, checked: true, layers: [
            { name: 'Subcategoría', radio: true, checked: true, layers: [
              { name: 'Un radio', radio: true, checked: true },
              { name: 'Otro radio', radio: true, checked: true }
            ] }
          ] },
          { name: 'Capa suelta', radio: false, checked: true },
          { name: 'Categoría', radio: false, checked: true, layers: [
            { name: 'Un checkbox', radio: false, checked: true },
            { name: 'Otro checkbox', radio: false, checked: true }
          ] }
        ],
        info: {
          avatar: {
            title: 'title',
            subtitle: 'subtitle',
            image: 'http://www.muse-ui.org/images/sun.jpg'
          },
          media: {
            title: 'title',
            subtitle: 'subtitle',
            image: 'http://www.muse-ui.org/images/sun.jpg'
          },
          content: {
            title: 'title',
            subtitle: 'subtitle',
            text: 'text'
          },
          metadata: [
            { key: 'key', value: 'value' },
            { key: 'key', value: 'value' },
            { key: 'key', value: 'value' },
            { key: 'key', value: 'value' },
            { key: 'key', value: 'value' }
          ]
        }
      }
    },
    methods: {
      i18n (string) {
        return string // TODO
      }
    }
  }
</script>

<style lang="stylus">
</style>
