const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const fetch = require('node-fetch')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)



// === GEO NAMES
// The GeoNames geographical database covers all countries and contains over eleven million placenames.
// http://api.geonames.org/postalCodeSearch?postalcode=9011&maxRows=10&username=demo

const geoBaseUrl = "http://api.geonames.org/search?q=";
const geoUsername = "&username=" + process.env.username;
const geoTextHolder = "&type=json";


console.log(`GeoName: ${process.env.username}`);

/*
app.post('/cityFrom', async function (req, res) {
	const cityFrom = req.body.cityFrom;
	
	console.log(cityFrom);
	console.log(geoBaseUrl+cityFrom+geoUsername+geoTextHolder);
	const responseFrom = await fetch (geoBaseUrl+cityFrom+geoUsername+geoTextHolder);
	const geoNamesFrom = await responseFrom.json();
	console.log(geoNamesFrom);
	res.json(geoNamesFrom);
})
*/

app.post('/cityTo', async function (req, res) {
	cityTo = req.body.cityTo;
	
	console.log(cityTo);
	console.log(geoBaseUrl+cityTo+geoUsername+geoTextHolder);
	const responseTo = await fetch (geoBaseUrl+cityTo+geoUsername+geoTextHolder);
	const geoNamesTo = await responseTo.json();
	console.log(geoNamesTo);
	res.json(geoNamesTo);
})



// === WEATHER BIT
// This API returns a 16 day forecast in 1 day intervals from any point on the planet.
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

const weaBaseUrl = "http://api.weatherbit.io/v2.0/forecast/daily?";
const weaAPIKEY = "&key=" + process.env.WEATHER_API_KEY;
const weaLatitude = "&lat=";
const weaLongitude = "&lon="; 

console.log(`Weather API is ${process.env.WEATHER_API_KEY}`);

app.post('/findWeather', async function (req, res) {
	const latitude = req.body.lat;
	const longitude = req.body.lon;
	
	console.log(`latitude: ${latitude} || longitude: ${longitude}`);
	console.log(weaBaseUrl+weaLatitude+latitude+weaLongitude+longitude+weaAPIKEY);
	
	const responseWeather = await fetch (weaBaseUrl+weaLatitude+latitude+weaLongitude+longitude+weaAPIKEY);
	const weatherBit = await responseWeather.json();
	console.log(weatherBit);
	res.json(weatherBit);
})



// === PIXABAY
// A RESTful interface for searching and retrieving free images released under the Pixabay License.
// https://pixabay.com/api/?key=KEY&q=yellow+flowers&image_type=photo

const pixBaseUrl = "https://pixabay.com/api/"
const pixAPIKEY = "?key=" + process.env.PIXABAY_API_KEY;
const pixTextHolderOne = "&q=";
const pixTextHolderTwo = "&lang=en&image_type=photo";

console.log(`username is ${process.env.PIXABAY_API_KEY}`);

app.post('/findImage', async function (req, res) {
	const cityName = req.body.city;
	
	console.log(cityName);
	console.log(pixBaseUrl+pixAPIKEY+pixTextHolderOne+cityName+pixTextHolderTwo);
	
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
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})









/* ========== START OLD CODE ==========
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

// Middleware
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))


// Setup Server
const port = 3000;
// Spin up the server
const server = app.listen(port, listening);
// Callback to debug
function listening(){
	console.log(`running of localhost: ${port}`);
};

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', getData);

function getData(req, res){
	res.send(projectData);
	//console.log(projectData);
};

// Post Route
app.post('/addWeather', addWeather);

function addWeather(req, res){
	//console.log(req.body)
	projectData.date = req.body.date;
	projectData.zip = req.body.zip;
	projectData.temp = req.body.temp;
	projectData.content = req.body.content;
	
	res.send(projectData);
}

==========  OLD CODE ==========*/