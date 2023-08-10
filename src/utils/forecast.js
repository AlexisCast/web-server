const request = require("postman-request");

const forecast = (latitud, longitud, callback) => {
	const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY_WEATHER}&q=${latitud},${longitud}`;
	request({ url }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to location services!", undefined);
		} else if (JSON.parse(body).error) {
			callback(
				"Unable to find location. Try another search",
				JSON.parse(body).error
			);
		} else {
			const data = JSON.parse(body);
			const currentData = data.current;
			callback(
				undefined,
				"It is currently " +
					currentData.temp_f +
					"F degrees out. There is a " +
					currentData.wind_mph +
					" mph of wind."
			);
		}
	});
};

module.exports = forecast;
