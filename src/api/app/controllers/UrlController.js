const mongoose = require("mongoose");
const shortid = require("shortid");
const geoIp = require("geoip-lite");
const UrlModel = require("../models/Url");

const validateUrl = url => url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

const short = async (req, res) => {
    if(req.body.url && validateUrl(req.body.url)){
        try {
            const urlObject = new UrlModel({
                url: req.body.url
            });
            const shortUrl = await urlObject.save();
            return res.status(200).json({ ...shortUrl._doc, "uniqueUrl": `${req.protocol}://${req.hostname}/${shortUrl._doc.uniqueUrl}`});
        } catch (err) {
            console.error("err", err);
            return res.status(500).json({"message": err});
        }
    }
    return res.status(400).json({"message": "Invalid Url"});
};

const list = (req, res) => {
    UrlModel.aggregate([
        {
            $match:  {isActive: true}
        },
        {
            $project: {
                url: 1,
                uniqueUrl: 1,
                dateAdded: 1,
                numClicks: {
                    $size: "$visitors"
                }
            }
        }
    ])
    .exec((err, docs) => {
        if(err){
            console.error("err", err);
            res.status(500).json(err);
        }
        res.status(200).json(docs.map(doc => ({
            ...doc, 
            uniqueUrl: `${req.protocol}://${req.hostname}/${doc.uniqueUrl}`, 
            stats: `${req.protocol}://${req.hostname}/${doc.uniqueUrl}/stats`
        })));
    });
};

const get = (req, res) => {
    if(shortid.isValid(req.params.url)){
        UrlModel.findOne({uniqueUrl: req.params.url}, async (err, doc) => {
            if(doc){
                try {
                    const visitor = {
                        referrer: req.get("Referrer"),
                        ip: req.ip,
                        userAgent: req.get("User-Agent"),
                        geo: geoIp.lookup(req.ip)
                    };
                    await UrlModel.updateOne({
                        _id: doc._id
                    }, {
                        "$push": {
                            visitors: visitor
                        }
                    });
                    res.redirect(302, doc.url);
                } catch (err) {
                    console.error("err", err);
                    res.status(500).json(err);
                }
            } else {
                res.status(404).json({
                    "message": "Invalid URL"
                });
            }
        });
    } else {
        res.status(404).json({
            "message": "Invalid URL"
        });
    }
    return res;
}

const getStats = (req, res) => {
    if(shortid.isValid(req.params.url)){
        UrlModel.findOne({uniqueUrl: req.params.url}, (err, doc) => {
            if(err){
                console.error("err", err);
                res.status(500).json(err);
            }
            res.status(200).json(doc);
        });
    } else {
        res.status(404).json({
            "message": "Invalid URL"
        });
    }
    return res;
}

module.exports = { 
    short,
    get,
    getStats,
    list
};
