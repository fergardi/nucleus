import Vue from 'vue'
import Vuex from 'vuex'

const float = (min, max) => {
  return min + Math.random() * (max - min)
}
const coordinates = () => {
  return [float(42.5, 42.7), float(-5.5, -5.7)]
}

Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    message: null,
    info: null,
    left: false,
    right: false,
    layers: [
      { name: 'Capas Operacionales', radio: false, checked: true, layers: [
        { name: 'Incidentes', radio: false, checked: true, layers: [
          { name: 'Activos', radio: false, checked: true, items: [
            {
              coordinates: coordinates(),
              avatar: {
                color: 'red',
                title: 'Nombre',
                subtitle: 'Lugar',
                image: 'https://image.flaticon.com/icons/svg/307/307003.svg'
              },
              media: {
                title: 'Estado',
                subtitle: '01/01/1971 00:00',
                image: 'https://images.unsplash.com/photo-1481121871234-1f3fb96a5f45'
              },
              content: [
                {
                  title: 'General',
                  subtitle: 'Datos generales del incendio',
                  metadata: [
                    { key: 'Hectáreas', value: 1000 },
                    { key: 'Personas', value: 100 },
                    { key: 'Vehículos', value: 3 },
                    { key: 'Viviendas', value: 94 },
                    { key: 'Árboles', value: 0 }
                  ]
                }
              ]
            }
          ] },
          { name: 'Inactivos', radio: false, checked: true, items: [
            {
              coordinates: coordinates(),
              avatar: {
                color: 'red',
                title: 'Incendio descomunal',
                subtitle: '01/01/1971 00:00',
                image: 'https://image.flaticon.com/icons/svg/307/307003.svg'
              },
              media: {
                title: 'title',
                subtitle: '01/01/1971 00:00',
                image: 'https://images.unsplash.com/photo-1481121871234-1f3fb96a5f45'
              },
              content: [
                {
                  title: 'General',
                  subtitle: 'Datos generales del incendio',
                  metadata: [
                    { key: 'Hectáreas', value: 234 },
                    { key: 'Personas', value: 22 },
                    { key: 'Vehículos', value: 33 },
                    { key: 'Viviendas', value: 945 },
                    { key: 'Árboles', value: 230 }
                  ]
                }
              ]
            }
          ] }
        ] },
        { name: 'Recursos', radio: false, checked: true, layers: [
          { name: 'Activos', radio: false, checked: true, items: [
            {
              coordinates: coordinates(),
              avatar: {
                color: 'orange',
                title: 'title',
                subtitle: '01/01/1971 00:00',
                image: 'https://image.flaticon.com/icons/svg/307/307021.svg'
              },
              media: {
                title: 'title',
                subtitle: 'subtitle',
                image: 'https://images.unsplash.com/photo-1455817626763-72371127d324'
              },
              content: [
                {
                  title: 'title',
                  subtitle: 'subtitle',
                  metadata: [
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' }
                  ]
                }
              ]
            }
          ] },
          { name: 'Inactivos', radio: false, checked: true, items: [
            {
              coordinates: coordinates(),
              avatar: {
                color: 'green',
                title: 'title',
                subtitle: '01/01/1971 00:00',
                image: 'https://image.flaticon.com/icons/svg/307/307021.svg'
              },
              media: {
                title: 'title',
                subtitle: 'subtitle',
                image: 'https://images.unsplash.com/photo-1455817626763-72371127d324'
              },
              content: [
                {
                  title: 'title',
                  subtitle: 'subtitle',
                  metadata: [
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' }
                  ]
                }
              ]
            }
          ] }
        ] },
        { name: 'Infraestructuras', radio: false, checked: true, layers: [
          { name: 'Bases', radio: false, checked: true, items: [
            {
              coordinates: coordinates(),
              avatar: {
                color: 'blue',
                title: 'title',
                subtitle: '01/01/1971 00:00',
                image: 'https://image.flaticon.com/icons/svg/307/307034.svg'
              },
              media: {
                title: 'title',
                subtitle: 'subtitle',
                image: 'https://images.unsplash.com/photo-1418439317068-f5666cbb23a3'
              },
              content: [
                {
                  title: 'title',
                  subtitle: 'subtitle',
                  metadata: [
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' },
                    { key: 'key', value: 'value' }
                  ]
                }
              ]
            }
          ] }
        ] }
      ] }
    ]
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    toggleLeft (state) {
      state.left = !state.left
    },
    toggleRight (state) {
      state.right = !state.right
    }
  }
})

export default vuex
