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
    return Date.now() / 1000 // generate timestamp
  },
  build () {
    var type = factory.type()
    var resource = {
      coordinates: factory.coordinates(),
      avatar: {
        color: factory.color(),
        title: 'Recurso ' + Math.floor(Math.random() * 100),
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
            { key: 'Distancia', value: factory.number(1000) },
            { key: 'Tiempo', value: factory.number(1000) },
            { key: 'Gasolina', value: factory.number(1000) }
          ]
        },
        {
          title: 'Histórico',
          subtitle: 'Últimos movimientos conocidos',
          positions: [
            factory.coordinates(),
            factory.coordinates(),
            factory.coordinates(),
            factory.coordinates(),
            factory.coordinates()
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
