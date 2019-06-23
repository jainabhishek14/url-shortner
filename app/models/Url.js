const mongoose =  require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    url: String,
    uniqueUrl: String,
    isActive: Boolean,
    createdDate: Date,
    expireTime: Date,
    user: {
        isGuest: Boolean,
        userName: String
    }
});

module.exports = mongoose.model("Url", UrlSchema);