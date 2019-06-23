const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const Url = require("./app/models/Url");

const port = process.env.PORT || 6666;
const databaseConnectionString = process.env.DB_CONNECTION || "mongodb://localhost:27017/url-shortner";
// mongoose instance connection url connections
mongoose.Promise = global.Promise;
mongoose.connect(databaseConnectionString, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).then(err => console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../../`));
require("./app/routes")(app);

const server = app.listen(port, () => {
    console.log("We are live on " + port);
});
module.exports = server;