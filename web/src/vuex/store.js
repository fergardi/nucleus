import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    message: null,
    layers: [
      { name: 'Categoría', radio: true, checked: true, layers: [
        { name: 'Subcategoría', radio: true, checked: true, layers: [
          { name: 'Un radio', radio: true, checked: true },
          { name: 'Otro radio', radio: true, checked: true }
        ] }
      ] },
      { name: 'Capa suelta', radio: false, checked: true },
      { name: 'Categoría', radio: false, checked: true, layers: [
        { name: 'Un checkbox', radio: false, checked: true },
        { name: 'Otro checkbox', radio: false, checked: true }
      ] }
    ],
    groups: [
      [
        { icon: 'https://image.flaticon.com/icons/svg/307/307003.svg', class: 'red' },
        { icon: 'https://image.flaticon.com/icons/svg/307/307003.svg', class: 'red' },
        { icon: 'https://image.flaticon.com/icons/svg/307/307003.svg', class: 'red' },
        { icon: 'https://image.flaticon.com/icons/svg/307/307003.svg', class: 'red' }
      ],
      [
        { icon: 'https://image.flaticon.com/icons/svg/122/122492.svg', class: 'green' },
        { icon: 'https://image.flaticon.com/icons/svg/122/122492.svg', class: 'green' },
        { icon: 'https://image.flaticon.com/icons/svg/122/122492.svg', class: 'green' },
        { icon: 'https://image.flaticon.com/icons/svg/122/122492.svg', class: 'green' },
        { icon: 'https://image.flaticon.com/icons/svg/186/186696.svg', class: 'green' },
        { icon: 'https://image.flaticon.com/icons/svg/186/186696.svg', class: 'green' },
        { icon: 'https://image.flaticon.com/icons/svg/186/186696.svg', class: 'green' },
        { icon: 'https://image.flaticon.com/icons/svg/186/186696.svg', class: 'green' }
      ],
      [
        { icon: 'https://image.flaticon.com/icons/svg/307/307034.svg', class: 'blue' },
        { icon: 'https://image.flaticon.com/icons/svg/307/307034.svg', class: 'blue' },
        { icon: 'https://image.flaticon.com/icons/svg/307/307034.svg', class: 'blue' },
        { icon: 'https://image.flaticon.com/icons/svg/307/307034.svg', class: 'blue' }
      ]
    ],
    info: {
      avatar: {
        title: 'title',
        subtitle: 'subtitle',
        image: 'http://www.muse-ui.org/images/sun.jpg'
      },
      media: {
        title: 'title',
        subtitle: 'subtitle',
        image: 'http://www.muse-ui.org/images/sun.jpg'
      },
      content: {
        title: 'title',
        subtitle: 'subtitle',
        text: 'text'
      },
      metadata: [
        { key: 'key', value: 'value' },
        { key: 'key', value: 'value' },
        { key: 'key', value: 'value' },
        { key: 'key', value: 'value' },
        { key: 'key', value: 'value' }
      ]
    }
  }
})

export default vuex
