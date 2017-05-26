<template lang="pug">
  form.admin-form
    mu-flexbox
      mu-flexbox-item
        mu-card
          mu-card-header(title="Nuevo tipo de elemento", subTitle="Crear un nuevo tipo")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188234.svg", slot="avatar")
          mu-card-text
            mu-text-field(v-model="name", label="Nombre", :fullWidth="true")
          mu-card-header(title="Editar un elemento existente", subTitle="Escoger un tipo")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188234.svg", slot="avatar")
          mu-card-text
            mu-select-field(v-model="selected", label="Tipo", :fullWidth="true", @change="select")
              mu-menu-item(v-for="type in collections", :title="type.name", :value="type")
      mu-flexbox-item
        mu-card
          mu-card-header(title="Datos del tipo", subTitle="Información adicional")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188235.svg", slot="avatar")
          mu-card-text
            .field(v-for="field, index in fields")
              mu-text-field(v-model="field.name", label="Campo", :fullWidth="true")
              mu-select-field(v-model="field.type", label="Tipo", :fullWidth="true")
                mu-menu-item(v-for="t in types", :title="t.name", :value="t.type")
          mu-card-text
            .buttons
              mu-raised-button(label="Eliminar", @click="remove(index)")
              mu-raised-button(label="Añadir", @click="add", primary)
      mu-flexbox-item
        mu-card
          mu-card-header(title="Guardar y enviar", subTitle="Confirmar")
            mu-avatar(src="https://image.flaticon.com/icons/svg/188/188236.svg", slot="avatar")
          mu-card-text
            .buttons
              mu-raised-button(label="Cancelar", @click="cancel")
              mu-raised-button(label="Terminar", @click="save", primary, :disabled="validate")
</template>

<script>
  import store from '../vuex/store'
  import firebase from '../services/firebase'

  export default {
    name: 'AdminForm',
    data () {
      return {
        selected: null,
        name: '',
        type: null,
        types: [
          { name: 'Texto corto', type: 'text' },
          { name: 'Texto largo', type: 'textarea' },
          { name: 'Selección', type: 'select' },
          { name: 'Número', type: 'number' },
          { name: 'Email', type: 'mail' },
          { name: 'Contraseña', type: 'password' },
          { name: 'Checkbox', type: 'checkbox' },
          { name: 'Radio', type: 'radio' },
          { name: 'Switch', type: 'switch' }
        ],
        fields: [
          { name: '', type: '', value: null, options: [] }
        ]
      }
    },
    firebase: {
      collections: firebase.ref('collections')
    },
    methods: {
      add () {
        this.fields.push({ name: '', type: '', value: null, options: [] })
      },
      remove (index) {
        this.fields.splice(index, 1)
      },
      select (item) {
        this.fields = item.data
      },
      cancel () {
        // TODO
        store.commit('toggleEdit')
      },
      save () {
        this.$firebaseRefs.collections.push({
          name: this.selected.name || this.name,
          data: this.fields
        })
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
