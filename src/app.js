const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

//https requests
const geocode = require("./utils/goecode");
const forecast = require("./utils/forecast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = 3000 || process.env.PORT;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
debugger
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Foo",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "This is some helpful text.",
		title: "Help",
		name: "Foo",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Foo",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide address",
		});
	}
	geocode(
		req.query.address,
		(error, { longitud, latitud, location } = {}) => {
			if (error) {
				return res.send({ error });
			}

			forecast(latitud, longitud, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}
				res.send({
					forecast: forecastData,
					location,
					address: req.query.address,
				});
			});
		}
	);
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}
	res.send({
		products: [],
	});
});

app.get("/help*", (req, res) => {
	res.render("404", {
		title: "404",
		messageError: "Help article not found",
		name: "Foo",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		messageError: "Page not found",
		name: "Foo",
	});
});

app.listen(port, () => {
	console.log(`Server is up on ${port}`);
});
