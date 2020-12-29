const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../src/utils/geoCode')
const forecast = require('../src/utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

//to launch express
const app = express()

//Define the paths for Express config
//to set the public folder path
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Using hbs as the default view engine requires just one line of code
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup a route for index.hbs page to render
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nandita Prasad'
    }) // ---> res.render() gets that view and converts into html and then we view it in the browser
})

//to setup the route for about tab
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nandita Prasad'
    })
})

//to setup the help route
app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful step.',
        title: 'Help',
        name: 'Nandita Prasad'
    })
})

//to generate weather route
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!!!'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                'Error': error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    'Error': error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is hazy',
    //     location: 'Bhilai',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'Search not defined'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nandita Prasad',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nandita Prasad',
        errorMessage: 'Page not found'
    })
})

//to actually listen to the server
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})