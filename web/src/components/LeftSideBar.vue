<template lang="pug">
  .side-bar
    .padding
      mu-text-field(:fullWidth="true", label="Buscar", icon="search", v-model="search")
    mu-list
      layer-list(:layers="filtered")
</template>

<script>
  import store from '../vuex/store'
  import LayerList from '../components/LayerList.vue'
  import InfoCard from '../components/InfoCard.vue'

  export default {
    name: 'LeftSideBar',
    components: { LayerList, InfoCard },
    data () {
      return {
        opacity: 50,
        search: ''
      }
    },
    methods: {
      i18n (string) {
        return string // TODO
      },
      copy (object) {
        return Object.assign({}, object)
      }
    },
    computed: {
      filtered () {
        const self = this
        return self.search.toLowerCase() === '' ? self.layers : self.layers.map(this.copy).filter(function recursive (o) {
          return o.name && o.name.toLowerCase().includes(self.search.toLowerCase()) || o.avatar && o.avatar.title.toLowerCase().includes(self.search.toLowerCase()) || o.layers && (o.layers = o.layers.map(self.copy).filter(recursive)).length || o.items && (o.items = o.items.map(self.copy).filter(recursive)).length
        })
      },
      layers () {
        return store.state.layers
      }
    }
  }
</script>

<style lang="stylus">
  .padding
    padding 16px
</style>
