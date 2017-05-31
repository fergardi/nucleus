import axios from 'axios'

const appid = '33551b3fa792d840fe5daf25ef9233ce'
const units = 'metric'
const lang = 'es'

module.exports = (coordinates) => {
  return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&lang=${lang}&units=${units}&APPID=${appid}`)
  .then((response) => {
    return {
      name: response.data.weather[0].description,
      timestamp: response.data.dt,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      degrees: response.data.main.temp,
      src: response.data.weather[0].icon,
      wind: response.data.wind.speed
    }
  })
  .catch(() => {
    return {
      name: '?',
      timestamp: Date.now(),
      humidity: 0,
      pressure: 0,
      degrees: 0,
      src: 'https://image.flaticon.com/icons/svg/148/148766.svg',
      wind: 0
    }
  })
}
