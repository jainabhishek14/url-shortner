import axios from "axios";

const dummyShortUrls = [
    {
        url: "http://google.com",
        uniqueUrl: "bfbhs7b9",
        dateAdded: new Date().toString(),
        numClicks: 10
    },
    {
        url: "http://google.com",
        uniqueUrl: "bfbhs7b9",
        dateAdded: new Date().toString(),
        numClicks: 10
    },
    {
        url: "http://google.com",
        uniqueUrl: "bfbhs7b9",
        dateAdded: new Date().toString(),
        numClicks: 10
    },
    {
        url: "http://google.com",
        uniqueUrl: "bfbhs7b9",
        dateAdded: new Date().toString(),
        numClicks: 10
    }
]

const shorten = url => axios.post("/short", {
    url
});

const fetchUrls = () => dummyShortUrls; //axios.get("/list");

export {
    shorten,
    fetchUrls
    // getStats
}