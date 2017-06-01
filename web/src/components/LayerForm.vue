<template lang="pug">
  form.layer-form
    mu-flexbox

      mu-flexbox-item
        mu-card
          mu-card-header(title="Nuevo tipo de elemento", subTitle="Crear un nuevo tipo")
            mu-avatar(:src="src", slot="avatar")
          mu-card-text
            mu-text-field(v-model="name", label="Nombre", :fullWidth="true")
            mu-text-field(v-model="src", label="Icono", :fullWidth="true")
          mu-card-text
            .buttons
              mu-raised-button(label="Cancelar", @click="cancel")
              mu-raised-button(label="Terminar", @click="save", primary, :disabled="!valid")
</template>

<script>
  import store from '../vuex/store'
  import firebase from '../services/firebase'

  export default {
    name: 'LayerForm',
    data () {
      return {
        name: 'Restaurantes',
        src: 'https://image.flaticon.com/icons/svg/235/235834.svg'
      }
    },
    firebase: {
      layers: firebase.ref('layers')
    },
    methods: {
      cancel () {
        this.clear()
        store.commit('toggleEdit')
      },
      clear () {
        this.name = ''
        this.src = ''
      },
      save () {
        this.$firebaseRefs.layers.child(this.name.toLowerCase()).set({
          checked: true,
          src: this.src,
          name: this.name.toLowerCase(),
          opened: false
        })
        store.commit('setMessage', 'Creado correctamente')
        store.commit('setToast', true)
        store.commit('toggleEdit')
      }
    },
    computed: {
      valid () {
        return this.name !== '' && this.src !== ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .layer-form
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
    .layer-form
      .mu-flexbox
        flex-direction column !important
        .mu-flexbox-item
          margin 5px 0px !important
</style>
