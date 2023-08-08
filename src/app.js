const path = require("path");
const express = require("express");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");
const port = 3000;

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

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
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Andrew Mead",
	});
});

app.get("/weather", (req, res) => {
	res.send({
		forecast: "forecast",
		location: "Philadelphia",
	});
});

app.listen(port, () => {
	console.log(`Server is up on ${port}`);
});
