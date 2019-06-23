const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const Url = require("./app/models/Url");

const port = process.env.port || 6666;
const databaseConnectionString = "mongodb://localhost:27017/url-shortner";
// mongoose instance connection url connections
mongoose.Promise = global.Promise;
mongoose.connect(databaseConnectionString, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).then(err => console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
require("./app/routes")(app);

app.listen(port, () => {
    console.log("We are live on " + port);
});