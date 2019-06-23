const mongoose =  require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;

const setExpireTime = time => time || new Date();

const UrlSchema = new Schema({
    url: {
        type: String,
        required: "Url is missing"
    },
    uniqueUrl: {
        type: String,
        validate: {
            validator: v => shortid.isValid(v),
            message: props => `${props.value} is not a valid url`
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expireTime: {
        type: Date,
        default: setExpireTime()
    },
    user: {
        isGuest: Boolean,
        userName: String
    }
}, {
    timestamps: {
        createdAt: "dateAdded",
        updatedAt: "dateUpdated"
    }
});

UrlSchema.pre("save", function() {
    this.uniqueUrl = shortid.generate();
});

module.exports = mongoose.model("Url", UrlSchema);