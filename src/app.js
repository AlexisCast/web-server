const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
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
	res.send({
		forecast: "forecast",
		location: "Philadelphia",
		address: req.query.address,
	});
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
