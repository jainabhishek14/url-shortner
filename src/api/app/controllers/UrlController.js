const mongoose = require("mongoose");
const shortid = require("shortid");
const geoIp = require("geoip-lite");
const UrlModel = require("../models/Url");

const short = async (req, res) => {
    try {
        const urlObject = new UrlModel({
            url: req.body.url
        });
        const shortUrl = await urlObject.save();
        res.status(200).json({ ...shortUrl._doc, "uniqueUrl": `${req.protocol}://${req.hostname}/${shortUrl._doc.uniqueUrl}`});
    } catch (err) {
        console.error("err", err);
        res.status(500).json({"message": err});
    }
};

const list = (req, res) => {
    UrlModel.find({isActive: true}, 'url uniqueUrl dateAdded', (err, docs) => {
        if(err){
            console.error("err", err);
            res.status(500).json(err);
        }
        res.status(200).json(docs.map(doc => ({...doc._doc, uniqueUrl: `${req.protocol}://${req.hostname}/${doc._doc.uniqueUrl}`})));
    });
};

const get = (req, res) => {
    if(shortid.isValid(req.params.url)){
        UrlModel.findOne({uniqueUrl: req.params.url}, async (err, doc) => {
            const visitor = {
                referrer: req.get("Referrer"),
                ip: req.ip,
                userAgent: req.get("User-Agent"),
                geo: geoIp.lookup(req.ip)
            };
            try {
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
