<template lang="pug">
  .side-bar
    .padding
      mu-text-field(:fullWidth="true", label="Buscar", icon="search", :value="search", @input="find")
      mu-raised-button(label="Limpiar", :fullWidth="true", primary, @click="clear")
    .padding
      mu-text-field(:fullWidth="true", label="Filtrar", icon="filter_list", :value="filter", @input="find")
      mu-raised-button(label="Limpiar", :fullWidth="true", primary, @click="clear")
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
    methods: {
      i18n (string) {
        return string // TODO
      },
      find (string) {
        store.commit('updateSearch', string)
      },
      geocode (address) {
        store.commit('updateAddress', address)
      },
      clear () {
        store.commit('updateSearch', '')
      }
    },
    computed: {
      filtered () {
        return store.getters.filtered
      },
      search () {
        return store.state.search
      },
      filter () {
        return store.state.filter
      }
    }
  }
</script>

<style lang="stylus">
  .padding
    padding 16px
</style>
