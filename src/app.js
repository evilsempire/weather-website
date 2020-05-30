const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')
//setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath);
//setup public path
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'EvilsEmpire'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'EvilsEmpire'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'EvilsEmpire'
    })
})

app.get('/weather', (req, res) => {


    if (!req.query.address) {
        return res.send({ error: 'Please provide address' })
    }


    geocode(req.query.address, (error, result) => {
        if (error) {
            return res.send({ error })
        };

        const { lattitude, longitude, location } = result;
        forecast(lattitude, longitude, (error, response) => {
            if (error) return res.send({ error })

            return res.send({
                response,
                location
            })
        })

    })
});

app.get('/products', (req, res) => {
    console.log(req.query);

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        name: 'EvilsEmpire',
        message: 'Help page not found that you are looking'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        name: 'EvilsEmpire',
        meesage: 'Page not found'
    })
})

app.listen(PORT, () => {
    console.log(`Server is runnnig on ${PORT}!`)
})