const UrlController = require("../controllers/UrlController");

module.exports = function(app) {
    app.route("/short")
        .post(UrlController.short);
}