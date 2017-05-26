import Firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDgjXgQ14qjDy7HrzFaS_FSzbaE3wYwAPU',
  authDomain: 'pokemon-ef043.firebaseapp.com',
  databaseURL: 'https://pokemon-ef043.firebaseio.com',
  projectId: 'pokemon-ef043',
  storageBucket: 'pokemon-ef043.appspot.com',
  messagingSenderId: '878915122969'
}

const app = Firebase.initializeApp(config)
const firebase = app.database()

module.exports = firebase
