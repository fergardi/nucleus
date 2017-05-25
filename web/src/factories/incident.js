const factory = {
  types: [
    { name: 'Incendio', icon: 'https://image.flaticon.com/icons/svg/307/307003.svg', image: 'https://images.unsplash.com/photo-1481121871234-1f3fb96a5f45' },
    { name: 'Inundación', icon: 'https://image.flaticon.com/icons/svg/433/433541.svg', image: 'https://images.unsplash.com/photo-1452723312111-3a7d0db0e024' },
    { name: 'Erupción', icon: 'https://image.flaticon.com/icons/svg/362/362378.svg', image: 'https://images.unsplash.com/photo-1477436637632-85d08d035630' },
    { name: 'Terremoto', icon: 'https://image.flaticon.com/icons/svg/362/362376.svg', image: 'https://images.unsplash.com/photo-1420824471541-fe7e0ae0baa4' },
    { name: 'Huracán', icon: 'https://image.flaticon.com/icons/svg/189/189177.svg', image: 'https://images.unsplash.com/photo-1442213391790-7656f6e368b9' }
  ],
  statuses: [
    'Activo',
    'Inactivo',
    'Falsa alarma'
  ],
  colors: [
    'orange',
    'yellow'
  ],
  weathers: [
    'https://image.flaticon.com/icons/svg/414/414935.svg',
    'https://image.flaticon.com/icons/svg/414/414934.svg',
    'https://image.flaticon.com/icons/svg/414/414926.svg',
    'https://image.flaticon.com/icons/svg/414/414936.svg',
    'https://image.flaticon.com/icons/svg/414/414975.svg',
    'https://image.flaticon.com/icons/svg/414/414973.svg'

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
  weather () {
    return factory.weathers[Math.floor(Math.random() * factory.weathers.length)]
  },
  date () {
    return Date.now() / 1000 // generate timestamp
  },
  build () {
    var type = factory.type()
    var incident = {
      coordinates: factory.coordinates(),
      avatar: {
        color: factory.color(),
        title: 'Incidente ' + Math.floor(Math.random() * 100),
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
            { key: 'Hectáreas', value: factory.number(1000) },
            { key: 'Personas', value: factory.number(1000) },
            { key: 'Vehículos', value: factory.number(1000) },
            { key: 'Viviendas', value: factory.number(1000) },
            { key: 'Árboles', value: factory.number(1000) }
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
        },
        {
          title: 'Climatología',
          subtitle: 'Datos en tiempo real',
          weather: {
            title: 'Tiempo',
            subtitle: 'Datos actuales',
            src: factory.weather(),
            metadata: [
              { key: 'Grados', value: factory.number(30) + ' ºC' },
              { key: 'Viento', value: factory.number(250) + ' km/h' },
              { key: 'Humedad', value: factory.number(100) + ' %' }
            ]
          }
        }
      ]
    }
    return incident
  },
  array (quantity) {
    var incidents = []
    for (var i = 0; i < quantity; i++) {
      incidents.push(factory.build())
    }
    return incidents
  }
}

module.exports = factory
