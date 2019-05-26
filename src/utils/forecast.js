const request = require('request')

const forecast = (latitude, longitude, callback) => {
   const url = 'https://api.darksky.net/forecast/148fa917e7390eb2e9b83b59b8def785/' + latitude +', ' + longitude + '?units=si'

   request({url, json: true}, (error, { body }) => {
      if (error) {
         callback('Unable to connect to weather service!', undefined)
      } else if (body.error) {
         callback('Unable to find the location!', undefined)
      } else {
         const curData = body.currently
         callback(undefined, `${body.daily.data[0].summary} It is currently ${Math.round(curData.temperature * 10) / 10} degrees. There is ${curData.precipProbability * 100}% chance of rain.`)
      }
   })
}

module.exports = forecast