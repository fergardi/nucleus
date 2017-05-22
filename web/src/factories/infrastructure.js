const factory = {
  types: [
    { name: 'Estación', icon: 'https://image.flaticon.com/icons/svg/307/307034.svg', image: 'https://images.unsplash.com/photo-1453726007388-5df12357fcc6' }
  ],
  statuses: [
    'Abierta',
    'Cerrada'
  ],
  colors: [
    'blue',
    'purple'
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
    var infrastructure = {
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
            { key: 'Personas', value: factory.number(1000) },
            { key: 'Vehículos', value: factory.number(1000) }
          ]
        }
      ]
    }
    return infrastructure
  },
  array (quantity) {
    var infrastructures = []
    for (var i = 0; i < quantity; i++) {
      infrastructures.push(factory.build())
    }
    return infrastructures
  }
}

module.exports = factory
