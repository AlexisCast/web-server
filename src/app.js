const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const port = 3000;

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.send("<h1>Weather</h1>");
});

app.get("/help", (req, res) => {
	res.send({
		hello: "test",
	});
});

app.get("/about", (req, res) => {
	res.send("<h1>About</h1>");
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
