const shortner 	= require("./shortner_routes");

module.exports = function(app, db) {
    shortner(app, db);
};