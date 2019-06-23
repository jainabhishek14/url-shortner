const mongoose = require("mongoose");
const UrlModel = require("../models/Url");

const short = async (req, res) => {
    try {
        const urlObject = new UrlModel({
            url: req.body.url
        });
        const shortUrl = await urlObject.save();
        res.status(200).json({"shortUrl": `${req.hostname}:${req.port}/${shortUrl.uniqueUrl}`});
    } catch (err) {
        console.log("err", err);
        res.status(500).json({"message": err});
    }
};

const get = (req, res) => {
    console.log(req);
    res.status(200).json({"message": "Successful"});
}

const getStats = (req, res) => {
    console.log(req);
    res.status(200).json({
        "message": "Successful"
    });
}

module.exports ={ 
    short,
    get,
    getStats
};
