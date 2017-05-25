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
    return Date.now() / 1000 // generate timestamp
  },
  build () {
    var type = factory.type()
    var infrastructure = {
      coordinates: factory.coordinates(),
      avatar: {
        color: factory.color(),
        title: 'Infraestructura ' + Math.floor(Math.random() * 100),
        subtitle: factory.status(),
        src: type.icon
      },
      media: {
        title: factory.status(),
        timestamp: factory.date(),
        src: type.image
      },
      content: [
        {
          title: 'General',
          subtitle: 'Información adicional',
          metadata: [
            { key: 'Personal', value: factory.number(1000) },
            { key: 'Vehículos', value: factory.number(1000) }
          ]
        },
        {
          title: 'Galería',
          subtitle: 'Imágenes adjuntas',
          gallery: [
            { src: 'https://images.unsplash.com/photo-1453060590797-2d5f419b54cb', title: 'Imagen', subtitle: 'Subtítulo' },
            { src: 'https://images.unsplash.com/photo-1453060590797-2d5f419b54cb', title: 'Imagen', subtitle: 'Subtítulo' },
            { src: 'https://images.unsplash.com/photo-1453060590797-2d5f419b54cb', title: 'Imagen', subtitle: 'Subtítulo' },
            { src: 'https://images.unsplash.com/photo-1453060590797-2d5f419b54cb', title: 'Imagen', subtitle: 'Subtítulo' }
          ]
        },
        {
          title: 'Documentos',
          subtitle: 'Ficheros adjuntos',
          files: [
            { src: 'https://image.flaticon.com/icons/svg/136/136522.svg', title: 'document.pdf', subtitle: '29/01/1523' },
            { src: 'https://image.flaticon.com/icons/svg/136/136521.svg', title: 'file.docx', subtitle: '29/01/1523' },
            { src: 'https://image.flaticon.com/icons/svg/136/136545.svg', title: 'video.mp4', subtitle: '29/01/1523' },
            { src: 'https://image.flaticon.com/icons/svg/136/136543.svg', title: 'presentation.ppt', subtitle: '29/01/1523' }
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
