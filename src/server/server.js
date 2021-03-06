const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
// Require Express to run server and routes
const express = require('express')
/* Dependencies */
const bodyParser = require('body-parser')
// Cors for cross origin allowance
const cors = require('cors')
// Start up an instance of app
const app = express()
const fetch = require('node-fetch')

/* Middleware */
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

console.log(__dirname)

let projectData = {};

// === GEO NAMES
// The GeoNames geographical database covers all countries and contains over eleven million placenames.
// http://api.geonames.org/postalCodeSearch?postalcode=9011&maxRows=10&username=demo

const geoBaseUrl = "http://api.geonames.org/search?q=";
const geoUsername = "&username=" + process.env.username;
const geoTextHolder = "&type=json";


app.post('/cityTo', async function (req, res) {
	cityTo = req.body.cityTo;
	
	const responseTo = await fetch (geoBaseUrl+cityTo+geoUsername+geoTextHolder);
	const geoNamesTo = await responseTo.json();
	res.json(geoNamesTo);
})



// === WEATHER BIT
// This API returns a 16 day forecast in 1 day intervals from any point on the planet.
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

const weaBaseUrl = "http://api.weatherbit.io/v2.0/forecast/daily?";
const weaAPIKEY = "&key=" + process.env.WEATHER_API_KEY;
const weaLatitude = "&lat=";
const weaLongitude = "&lon="; 


app.post('/findWeather', async function (req, res) {
	const latitude = req.body.lat;
	const longitude = req.body.lon;
	
	const responseWeather = await fetch (weaBaseUrl+weaLatitude+latitude+weaLongitude+longitude+weaAPIKEY);
	const weatherBit = await responseWeather.json();
	res.json(weatherBit);
})



// === PIXABAY
// A RESTful interface for searching and retrieving free images released under the Pixabay License.
// https://pixabay.com/api/?key=KEY&q=yellow+flowers&image_type=photo

const pixBaseUrl = "https://pixabay.com/api/"
const pixAPIKEY = "?key=" + process.env.PIXABAY_API_KEY;
const pixTextHolderOne = "&q=";
const pixTextHolderTwo = "&lang=en&image_type=photo";


app.post('/findImage', async function (req, res) {
	const cityName = req.body.city;
	
	const responsePixa = await fetch (pixBaseUrl+pixAPIKEY+pixTextHolderOne+cityName+pixTextHolderTwo);
	let pixaBay = await responsePixa.json();
	//totalHits The number of images accessible through the API.
	if (pixaBay.totalHits > 0){
		//Image found
		res.json(pixaBay);
	}else {
		alert("The city isn't found, try another one")
	}
	
})


// Get Router
app.get('/', function (req, res) {
    //res.sendFile(path.resolve('src/client/views/index.html'))
	res.status(200).sendFile('dist/index.html')
})


module.exports = app;
