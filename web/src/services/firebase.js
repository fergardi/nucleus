import Firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDoWxdk5hNGFdjDBJ9YPL2YJlWY25hHHug',
  authDomain: 'test-db696.firebaseapp.com',
  databaseURL: 'https://test-db696.firebaseio.com',
  projectId: 'test-db696',
  storageBucket: 'test-db696.appspot.com',
  messagingSenderId: '418795104746'
}

const app = Firebase.initializeApp(config)
const firebase = app.database()

module.exports = firebase
