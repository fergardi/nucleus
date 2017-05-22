const factory = {
  types: [
    { name: 'Bombero', icon: 'https://image.flaticon.com/icons/svg/122/122492.svg', image: 'https://images.unsplash.com/photo-1455817626763-72371127d324' },
    { name: 'Camión', icon: 'https://image.flaticon.com/icons/svg/307/307021.svg', image: 'https://images.unsplash.com/photo-1455817626763-72371127d324' },
    { name: 'Helicóptero', icon: 'https://image.flaticon.com/icons/svg/426/426087.svg', image: 'https://images.unsplash.com/photo-1481567681190-7584beb89c1f' },
    { name: 'Hidroavión', icon: 'https://image.flaticon.com/icons/svg/194/194991.svg', image: 'https://images.unsplash.com/photo-1479160745969-9dc8890fb6d6' }
  ],
  statuses: [
    'Activo',
    'Inactivo'
  ],
  colors: [
    'green',
    'red'
  ],
  float (min, max) {
    return min + Math.random() * (max - min)
  },
  coordinates () {
    return [factory.float(42.5, 42.7), factory.float(-5.5, -5.7)]
  },
  number (max) {
    return Math.floor(Math.random() * max)
  },
  status () {
    return factory.statuses[Math.floor(Math.random() * factory.statuses.length)]
  },
  type () {
    return factory.types[Math.floor(Math.random() * factory.types.length)]
  },
  color () {
    return factory.colors[Math.floor(Math.random() * factory.colors.length)]
  },
  date () {
    return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)).toString()
  },
  build () {
    var type = factory.type()
    var resource = {
      coordinates: factory.coordinates(),
      avatar: {
        color: factory.color(),
        title: type.name,
        subtitle: factory.status(),
        src: type.icon
      },
      media: {
        title: factory.status(),
        subtitle: factory.date(),
        src: type.image
      },
      gallery: [
        { src: 'https://images.unsplash.com/photo-1453060590797-2d5f419b54cb', title: 'Imagen', subtitle: 'Subtítulo' },
        { src: 'https://images.unsplash.com/photo-1453060590797-2d5f419b54cb', title: 'Imagen', subtitle: 'Subtítulo' },
        { src: 'https://images.unsplash.com/photo-1453060590797-2d5f419b54cb', title: 'Imagen', subtitle: 'Subtítulo' },
        { src: 'https://images.unsplash.com/photo-1453060590797-2d5f419b54cb', title: 'Imagen', subtitle: 'Subtítulo' }
      ],
      content: [
        {
          title: 'General',
          subtitle: 'Información adicional',
          metadata: [
            { key: 'Distancia', value: factory.number(1000) },
            { key: 'Tiempo', value: factory.number(1000) },
            { key: 'Gasolina', value: factory.number(1000) }
          ]
        }
      ]
    }
    return resource
  },
  array (quantity) {
    var resources = []
    for (var i = 0; i < quantity; i++) {
      resources.push(factory.build())
    }
    return resources
  }
}

module.exports = factory
