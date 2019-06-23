import axios from "axios";

const shorten = url => axios.post("/short", {
    url
});

const fetchUrls = () => axios.get("/list");

export {
    shorten,
    fetchUrls
    // getStats
}