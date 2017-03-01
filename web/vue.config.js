var axis = require('axis')
var autoprefixer = require('autoprefixer-stylus')

module.exports = {
  stylus: {
    use: [axis(), autoprefixer()]
  }
}
