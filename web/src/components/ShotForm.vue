<template lang="pug">
  form.shot-form
    mu-flexbox

      mu-flexbox-item
        mu-card
          mu-card-header(title="Tipo", subTitle="Escoger tipo")
            mu-avatar(src="https://image.flaticon.com/icons/svg/337/337308.svg", slot="avatar")
          mu-card-text
            mu-select-field(v-model="shot.src", label="Tipo", :fullWidth="true")
              mu-menu-item(v-for="type in types", :title="type.name", :value="type.src")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Descripción", subTitle="Datos del disparo")
            mu-avatar(src="https://image.flaticon.com/icons/svg/235/235248.svg", slot="avatar")
          mu-card-text
            mu-text-field(v-model="shot.name", label="Nombre", :fullWidth="true")
            mu-text-field(v-model="shot.description", :multiLine="true", :rows="5", label="Descripción", :fullWidth="true")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Cantidad", subTitle="Número de disparos")
            mu-avatar(src="https://image.flaticon.com/icons/svg/308/308860.svg", slot="avatar")
          mu-card-text
            mu-text-field(v-model="shot.quantity", type="number", label="Cantidad", :fullWidth="true")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Confirmar", subTitle="Previsualizar y guardar")
            mu-avatar(src="https://image.flaticon.com/icons/svg/234/234247.svg", slot="avatar")
          mu-card-text
            mu-list.shots
              mu-list-item(:title="shot.name", :describeText="shot.description")
                mu-avatar(:src="shot.src", slot="leftAvatar")
                mu-badge(:content="shot.quantity.toString()", slot="right", circle, primary)
            .buttons
              mu-raised-button(label="Enfundar", @click="close")
              mu-raised-button(label="Disparar", @click="save", primary, :disabled="!valid")
</template>

<script>
  import store from '../vuex/store'
  import firebase from '../services/firebase'

  export default {
    name: 'ShotForm',
    data () {
      return {
        shot: {
          name: 'Descuento épico',
          description: 'Un descuento de ejemplo del 20% en tu primera compra',
          quantity: 10,
          src: 'https://image.flaticon.com/icons/svg/330/330730.svg'
        },
        types: [
          { name: 'Regalo', src: 'https://image.flaticon.com/icons/svg/308/308860.svg' },
          { name: 'Descuento', src: 'https://image.flaticon.com/icons/svg/330/330730.svg' }
        ]
      }
    },
    firebase: {
      layers: firebase.ref('layers')
    },
    methods: {
      reset () {
        this.name = ''
        this.description = ''
        this.src = ''
        this.quantity = 0
      },
      close () {
        this.reset()
        store.commit('toggleShot')
      },
      save () {
        firebase.ref('layers').child(store.state.firebase.collection).child('items').child(store.state.firebase.item).child('shots').push(this.shot)
        store.commit('setMessage', 'Disparo creado')
        store.commit('setToast', true)
        this.close()
      }
    },
    computed: {
      valid () {
        return this.shot.name !== '' && this.shot.description !== '' && this.shot.quantity > 0 && this.shot.src !== ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .shot-form
    .mu-flexbox
      flex-direction row
      align-items flex-start
      .mu-flexbox-item
        width 100%
        margin 0px 5px !important
    .field
    .buttons
      display flex
      justify-content flex-end
      align-items center
      .mu-raised-button + .mu-raised-button
      .mu-text-field + .mu-text-field
        margin-left 5px
  @media (max-width 768px)
    .shot-form
      .mu-flexbox
        flex-direction column !important
        .mu-flexbox-item
          margin 5px 0px !important
</style>
