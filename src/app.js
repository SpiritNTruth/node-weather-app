const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Chris Yang'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Chris Yang'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name:'Chris Yang',
    message: 'Powered by node.js'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
 
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
 
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Chris Yang',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Chris Yang',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port + '.')
})