<template lang="pug">
  mu-card.info-card(v-if="info")
    // MEDIA
    mu-card-media.media(v-if="info.media", :title="info.avatar.title | capitalize", :subTitle="info.avatar.subtitle")
      mu-float-button.fab(icon="add", @click="shot", :mini="true")
      img(:src="info.media.src")
    
    // DESCRIPTION
    mu-card-text
      span {{ info.description }}

    // SHOTS
    mu-list.shots(v-if="info.shots")
      mu-list-item(v-for="shot in shots", :title="shot.name", :describeText="shot.description", @click="decrease(shot)")
        mu-avatar(:src="shot.src", slot="leftAvatar")
        mu-badge(:content="shot.quantity.toString()", slot="right", circle, primary)
</template>

<script>
  import store from '../vuex/store'
  import moment from 'moment'
  import firebase from '../services/firebase'

  export default {
    name: 'InfoCard',
    created () {
      store.watch((state) => state.firebase.item, () => {
        this.$bindAsArray('shots', firebase.ref('layers').child(store.state.firebase.collection).child('items').child(store.state.firebase.item).child('shots'))
      })
    },
    firebase: {
      layers: firebase.ref('layers')
    },
    methods: {
      date (timestamp) {
        return moment.unix(timestamp).format('DD/MM/YYYY HH:mm:ss')
      },
      shot () {
        store.commit('toggleShot')
      },
      decrease (shot) {
        shot.quantity > 1
          ? this.$firebaseRefs.shots.child(shot['.key']).child('quantity').set(parseInt(shot.quantity) - 1)
          : this.$firebaseRefs.shots.child(shot['.key']).remove()
      }
    },
    computed: {
      map () {
        return store.state.map
      },
      info () {
        return this.layers
          ? store.state.firebase.index !== null && store.state.firebase.item !== null
            ? this.layers[store.state.firebase.index].items[store.state.firebase.item]
            : null
          : null
      }
    }
  }
</script>

<style lang="stylus">
  .mu-card-header-title
    padding-right 20px
  .shots
    .mu-item-wrapper
      border 2px dashed darkgrey
      margin 5px
    .mu-item .mu-item-right .mu-badge-container
      right 0
</style>

<style lang="stylus" scoped>
  .info-card
    box-shadow none !important
    .mu-avatar
      background-color transparent
    .container
      display flex
      flex-wrap wrap
      justify-content space-around
    .media
      .fab
        position absolute
        right 10px
        top 10px
    #positions
      width 100%
      height 250px
</style>