const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;
//console.log(__dirname);
//console.log(__filename);

//to set html as default route use path

//console.log(path.join(__dirname, '../public'));

//Define path directory to serve static pages
const publicPathDirectory = path.join(__dirname, '../public');
app.use(express.static(publicPathDirectory)); //set default route

//Define express config to set view engine and views
app.set('view engine', 'hbs');
//console.log(path.join(__dirname, './templates'));
const viewsDirectory = path.join(__dirname, './templates/views');
app.set('views', viewsDirectory);
const partialsDirectory = path.join(__dirname, './templates/partials');
hbs.registerPartials(partialsDirectory);

//page routes

app.get('', (req,res)=>{
    res.render('index', {
        title: "Weather",
        name: "Ashish Kumar"
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: "About",
        name: "Ashish Kumar"
    })
})
app.get('/help', (req,res)=>{
    res.render('help', {
        title: "Help",
        name: "Ashish Kumar",
        helpText: "This is some usefule help text."
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
       return  res.send({
           error: "You must provide address"
       });     

    }
    geoCode(req.query.address, (error, { place, latitude, longitude} = {})=>{
        if(error){
            res.send({
                error: error
            })
        }else{
            forecast.weatherInfo(latitude, longitude, (error, { temperature, feelslike, humidity} = {})=>{
                if(error){
                    res.send({
                        error: error
                    })
                }else{
                    res.send({
                        location: place,
                        forecast: 'Real temperature is ' + temperature + ' but it feel like ' +  feelslike + ' with humidity of ' + humidity + '%',
                        address: req.query.address

                    })
                }
            })
        }
    })

    
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Ashish Kumar',
       errorMessage: 'Help article not found'
    })
})


app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Ashish Kumar',
       errorMessage: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server started successfully on port ' + port)
})


//nodemon -e <extension comma separated> <filename>