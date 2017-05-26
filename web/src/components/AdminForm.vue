<template lang="pug">
  form.admin-form
    mu-flexbox
      mu-flexbox-item
        mu-card
          mu-card-header(title="Nuevo tipo de elemento", subTitle="Crear un tipo")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188234.svg", slot="avatar")
          mu-card-text
            mu-text-field(v-model="name", label="Nombre", :fullWidth="true")
      mu-flexbox-item
        mu-card
          mu-card-header(title="Imagen del nuevo tipo", subTitle="Agregar imagen")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188235.svg", slot="avatar")
          mu-card-text
            mu-text-field(v-model="src", label="URL", :fullWidth="true")
          mu-card-media(title="Imagen", subtitle="Agregar imagen")
            img(:src="src")
      mu-flexbox-item
        mu-card
          mu-card-header(title="Atributos del nuevo tipo", subTitle="Información")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188236.svg", slot="avatar")
          mu-card-text
            .field(v-for="field in fields")
              mu-text-field(v-model="field.name", label="Nombre", :fullWidth="true")
              mu-select-field(v-model="field.type", label="Tipo", :fullWidth="true")
                mu-menu-item(v-for="t in types", :title="t.name", :value="t.value")
          mu-card-text
            .buttons
              mu-raised-button(label="Añadir", @click="add", primary)
      mu-flexbox-item
        mu-card
          mu-card-header(title="Guardar y enviar", subTitle="Confirmar")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188237.svg", slot="avatar")
          mu-card-text
            .buttons
              mu-raised-button(label="Cancelar", @click="cancel", secondary)
              mu-raised-button(label="Terminar", @click="save", primary, :disabled="validate")
</template>

<script>
  import store from '../vuex/store'

  export default {
    name: 'AdminForm',
    data () {
      return {
        name: '',
        src: 'https://images.unsplash.com/photo-1474600056930-615c3d706456',
        type: null,
        types: [
          { name: 'Texto corto', value: 'text' },
          { name: 'Texto largo', value: 'textarea' },
          { name: 'Selección', value: 'select' },
          { name: 'Número', value: 'number' },
          { name: 'Email', value: 'mail' },
          { name: 'Contraseña', value: 'password' },
          { name: 'Checkbox', value: 'checkbox' },
          { name: 'Radio', value: 'radio' },
          { name: 'Switch', value: 'switch' }
        ],
        fields: [
          { name: '', value: null }
        ]
      }
    },
    methods: {
      add () {
        this.fields.push({ name: '', value: null })
      },
      cancel () {
        // TODO
        store.commit('toggleEdit')
      },
      save () {
        // TODO
        store.commit('resetMessage')
        store.commit('setMessage', 'Creado correctamente')
        store.commit('toggleEdit')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .admin-form
    .mu-flexbox
      flex-direction row
      align-items flex-start
      .mu-flexbox-item
        margin 0px 5px !important
        width 100%
    .field
    .buttons
      display flex
      justify-content flex-end
      align-items center
      .mu-raised-button + .mu-raised-button
      .mu-text-field + .mu-text-field
        margin-left 5px
  @media (max-width 768px)
    .admin-form
      .mu-flexbox
        flex-direction column !important
        .mu-flexbox-item
          margin 5px 0px !important
</style>
