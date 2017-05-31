<template lang="pug">
  .side-bar
    .padding
      mu-auto-complete(v-model="address", @input="find", :dataSource="addresses", :fullWidth="true", :openOnFocus="true", label="Buscar", :maxSearchResults="5", @select="locate", icon="search")
      mu-text-field(:fullWidth="true", label="Filtrar elementos", icon="filter_list", :value="search", @input="select")
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
    data () {
      return {
        address: '',
        places: []
      }
    },
    methods: {
      i18n (string) {
        return string // TODO
      },
      select (string) {
        store.commit('updateSearch', string)
      },
      find () {
        if (!this.address || !this.address.length) this.places = []
        this.map.G.geocode(this.address, matches => {
          this.places = matches
        })
      },
      locate (center) {
        this.map.L.panTo(center.value)
      },
      clear () {
        store.commit('updateSearch', '')
        this.address = ''
        this.places = []
      }
    },
    computed: {
      filtered () {
        return store.getters.filtered
      },
      search () {
        return store.state.search
      },
      addresses () {
        return this.places.map((p) => { return { text: p.name, value: p.center } })
      },
      map () {
        return store.state.map
      }
    }
  }
</script>

<style lang="stylus">
  .padding
    padding 16px
</style>
