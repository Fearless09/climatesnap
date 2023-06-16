export const geoApiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const geoApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '92f01b44a6msh5397f973b7aee2cp1fc2dajsn00b54bde30e8',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

export const WeatherApiUrl = 'https://api.openweathermap.org/data/2.5'

export const weatherApiKey = '027b39ce8de9e71430d14720a93bb5c2'

export const openCageApiKey = '6e57f058c87240529d1ab189dd9c1882';

export const openCageUrl = 'https://api.opencagedata.com/geocode/v1'

// try {
// 	const response = await fetch(geoApiUrl, geoApiOptions);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }