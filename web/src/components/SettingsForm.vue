<template lang="pug">
  form.settings-form
    mu-flexbox

      mu-flexbox-item
        mu-card
          mu-card-header(title="Datos asociados", subTitle="Información completa")
            mu-avatar(src="https://image.flaticon.com/icons/svg/235/235248.svg", slot="avatar")
          mu-card-text
            mu-select-field(v-model="language", label="Idioma", :fullWidth="true")
              mu-menu-item(v-for="lang in langs", :title="lang.name", :value="lang.value")
            .buttons
              mu-raised-button(label="Cancelar", @click="close")
              mu-raised-button(label="Guardar", @click="save", primary)
</template>

<script>
  import store from '../vuex/store'

  export default {
    name: 'SettingsForm',
    data () {
      return {
        language: 'es',
        langs: [
          { name: 'Español', value: 'es' }
        ]
      }
    },
    methods: {
      close () {
        store.commit('toggleSettings')
      },
      save () {
        // TODO
        this.close()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .settings-form
    .mu-flexbox
      flex-direction row
      align-items flex-start
      .mu-flexbox-item
        width 100%
        margin 5px !important
    .buttons
      display flex
      justify-content flex-end
      align-items center
      .mu-raised-button + .mu-raised-button
        margin-left 5px
  @media (max-width 768px)
    .settings-form
      .mu-flexbox
        flex-direction column !important
        .mu-flexbox-item
          width 100%
          margin 5px 0px !important
</style>
