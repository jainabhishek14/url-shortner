const urlRoutes = require("./urlRoutes");
const handler = require("../middlewares/handler");
module.exports = function(app) {
    urlRoutes(app);
    app.all("*", handler.unknownMethodHandler);
};