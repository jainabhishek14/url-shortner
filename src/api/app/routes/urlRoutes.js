const UrlController = require("../controllers/UrlController");

module.exports = function(app) {
    app.route("/short")
        .post(UrlController.short);
    app.route("/list")
        .get(UrlController.list);
    app.route("/:url")
        .get(UrlController.get);
    app.route("/:url/stats")
        .get(UrlController.getStats);
}