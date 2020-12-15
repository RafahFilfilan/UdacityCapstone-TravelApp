const handleSubmit = async (event) => {
	event.preventDefault()
	// check what text was put into the form field
	let cityFrom = document.getElementById('cityFrom').value;
	let cityTo = document.getElementById('cityTo').value;
	let dateStart = document.getElementById('dateStart').value;
	let dateEnd = document.getElementById('dateEnd').value;
	
	if(cityFrom === ""){
		alert('Cannot proceed with empty origin');
		return;
	}
	if(cityTo === ""){
		alert('Cannot proceed with empty destination');
		return;
	}	
	
	let tripStart = new Date(dateStart);
	let tripEnd = new Date(dateEnd);
	let daysDiff = (tripEnd.getTime() - tripStart.getTime())/(1000*3600*24);
	console.log(daysDiff)
	console.log("::: Form Submitted :::")
	

	//Since some data are required for multiple functions, so it is easier to create them as variables.
	// Global Variables:
	let paradise = {};
	let weatherData = {};
	let pixaData = {};
	
	console.log("::: Using GeoNames here :::");
	const postGeoData = await fetch ('http://localhost:8080/cityTo', {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({cityTo: cityTo})		
	});
	
	try {
		const newGeoData = await postGeoData.json();
		//Data as: Name - Country - Feature class - Latitude - Longitude
		paradise = {
			city: newGeoData.geonames[0].name,
			country: newGeoData.geonames[0].countryName,
			lat: newGeoData.geonames[0].lat,
			lon: newGeoData.geonames[0].lng
		}
		let cityXYZ = newGeoData.geonames[0].name;
		let countryXYZ = newGeoData.geonames[0].countryName;
		let latXYZ = newGeoData.geonames[0].lat;
		let lonXYZ = newGeoData.geonames[0].lng;
		
		//return paradise;
	} catch (error){
		console.log('error', error)
	}

	console.log("::: Using WeatherBit here :::");
	const postWeatherData = await fetch ('http://localhost:8080/findWeather', {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(paradise)		
	});
	
	try {
		weatherData = await postWeatherData.json();
		//return weatherData;
	} catch (error){
		console.log('error', error)
	}

	console.log("::: Using PixaBay here :::");
	const postPixaData = await fetch ('http://localhost:8080/findImage', {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(paradise)		
	});
	
	try {
		pixaData = await postPixaData.json();
		//return pixaData;
	}catch (error){
		console.log('error', error)
	}
	
	const htmlSection = document.getElementById('results');
	htmlSection.innerHTML = updateUI(dateStart, dateEnd, daysDiff, paradise, weatherData, pixaData);
	

} //End of handleSubmit 
	
	
	
function updateUI (dateStart, dateEnd, daysDiff, paradise, weatherData, pixaData){
	return `
		<div id="timeTravel">
			<p>You are traveling from ${dateStart} till ${dateEnd}</p>
			<p>Your trip will be in the length of ${daysDiff} days</p>
		</div>
		<div id="paradise">
			<h3>Your destination is ${paradise.city}, ${paradise.country}</h3>
		</div>
		<h5>Here is an image of your destination city</h5>
		<img src="${pixaData.hits[0].webformatURL}" alt="img of ${paradise.city}">
		<h4>The weather probably will be</h4>
		<div>
			<p>High: ${weatherData.data[0].max_temp}</p>
			<p>Low:  ${weatherData.data[0].min_temp}</p>
		</div>
		
	`
	
}


export { handleSubmit }

