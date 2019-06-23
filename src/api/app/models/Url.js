const mongoose =  require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;

const setExpireTime = time => time || new Date();

const VisitorSchema = new Schema({
    referrer: String,
    ip: String,
    userAgent: String,
    dateOfVisit: {
        type: Date,
        default: Date.now
    },
    geo: {
        range: [Number],
        country: String,
        region: String,
        timezone: String,
        city: String,
        ll: [Number],
        metro: Number,
        area: Number
    }
});

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
        },
        unique: true
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
        isGuest: {
            type: Boolean,
            default: true
        },
        userName: String
    },
    visitors: [VisitorSchema]
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