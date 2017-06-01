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

      mu-flexbox-item
        mu-card
          mu-card-header(title="Estados del tipo", subTitle="Crear estados")
            mu-avatar(src="https://image.flaticon.com/icons/svg/216/216272.svg", slot="avatar")
          mu-card-text
            .field(v-for="status, index in statuses")
              mu-text-field(v-model="status.name", label="Estado", :fullWidth="true")
              mu-select-field(v-model="status.color", label="Color", :fullWidth="true")
                mu-menu-item(v-for="c in colors", :title="c.name", :value="c.value")
          mu-card-text
            .buttons
              mu-raised-button(label="Eliminar", @click="removeStatus(index)")
              mu-raised-button(label="Añadir", @click="addStatus", primary, :disabled="!lastStatus")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Datos del tipo", subTitle="Información adicional")
            mu-avatar(src="https://image.flaticon.com/icons/svg/235/235248.svg", slot="avatar")
          mu-card-text
            .field(v-for="field, index in fields")
              mu-text-field(v-model="field.name", label="Campo", :fullWidth="true")
              mu-select-field(v-model="field.type", label="Tipo", :fullWidth="true")
                mu-menu-item(v-for="t in types", :title="t.name", :value="t.type")
          mu-card-text
            .buttons
              mu-raised-button(label="Eliminar", @click="removeData(index)")
              mu-raised-button(label="Añadir", @click="addData", primary, :disabled="!lastField")

      mu-flexbox-item
        mu-card
          mu-card-header(title="Guardar y enviar", subTitle="Confirmar")
            mu-avatar(src="https://image.flaticon.com/icons/svg/234/234247.svg", slot="avatar")
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
        src: 'https://image.flaticon.com/icons/svg/235/235834.svg',
        name: 'Restaurantes',
        type: null,
        types: [
          { name: 'Texto corto', type: 'text' },
          { name: 'Texto largo', type: 'textarea' },
          { name: 'Número', type: 'number' },
          { name: 'Email', type: 'mail' },
          { name: 'Contraseña', type: 'password' },
          { name: 'Checkbox', type: 'checkbox' },
          { name: 'Switch', type: 'switch' }
        ],
        statuses: [
          { name: 'Abierto', color: 'green' }
        ],
        colors: [
          { name: 'Rojo', value: 'red' },
          { name: 'Verde', value: 'green' },
          { name: 'Amarillo', value: 'yellow' },
          { name: 'Naranja', value: 'orange' },
          { name: 'Morado', value: 'purple' },
          { name: 'Rosa', value: 'pink' },
          { name: 'Azul', value: 'blue' },
          { name: 'Marrón', value: 'brown' },
          { name: 'Negro', value: 'black' },
          { name: 'Gris', value: 'grey' }
        ],
        fields: [
          { name: 'Dato', type: 'number', value: Math.random() * 1000 },
          { name: 'Dato', type: 'number', value: Math.random() * 1000 }
        ]
      }
    },
    firebase: {
      layers: firebase.ref('layers')
    },
    methods: {
      addData () {
        this.fields.push({ name: '', type: '', value: null })
      },
      removeData () {
        this.fields.splice(this.fields.length - 1, 1)
      },
      addStatus () {
        this.statuses.push({ name: '', color: '' })
      },
      removeStatus () {
        this.statuses.splice(this.statuses.length - 1, 1)
      },
      select (item) {
        this.fields = item.data
        this.name = ''
      },
      cancel () {
        // TODO
        store.commit('toggleEdit')
      },
      clear () {
        this.status = null
        this.name = ''
        this.src = ''
        this.fields = [{ name: '', type: '', value: null }]
        this.statuses = [{ name: '', color: '' }]
      },
      save () {
        this.$firebaseRefs.layers.child(this.name.toLowerCase()).set({
          checked: true,
          src: this.src,
          name: this.name.toLowerCase(),
          opened: false,
          data: this.fields,
          statuses: this.statuses
        })
        store.commit('resetMessage')
        store.commit('setMessage', 'Creado correctamente')
        store.commit('toggleEdit')
      }
    },
    computed: {
      lastField () {
        return (this.fields.length > 0 && this.fields[this.fields.length - 1].name !== '' && this.fields[this.fields.length - 1 ].type !== '') || this.fields.length === 0
      },
      lastStatus () {
        return (this.statuses.length > 0 && this.statuses[this.statuses.length - 1].name !== '' && this.statuses[this.statuses.length - 1].color !== '') || this.statuses.length === 0
      },
      valid () {
        return this.lastStatus && this.lastField && this.name !== ''
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
