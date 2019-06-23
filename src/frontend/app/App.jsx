import React, {Component} from "react";
import {shorten, fetchUrls} from "./api/index.js";
import {Header, Footer, Main} from "./components/index.jsx";

import "./App.scss";

const validateUrl = url => url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

class App extends Component {
    constructor(){
        super();
        this.shortenUrl = this.shortenUrl.bind(this);
        this.state = {
            hasError: false,
            shortUrls: []
        };
    }

    shortenUrl(value){
        console.log(value);
        if(validateUrl(value)){
            console.log("make a request");
            shorten(value)
                .then(response => this.setState(state => (state.shortUrls.push(response.data))))
                .catch(error => console.error(error));
        } else {
            console.log("Invalid Url");
            this.setState(state => ({hasError: !state.hasError}));
        }
    }

    componentDidMount(){
        // fetchUrls()
        this.setState(state => ({shortUrls :state.shortUrls.concat(fetchUrls())}))
            // .then(response => this.setState(state => (state.shortUrls.push(response.data))))
            // .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="app">
                <Header />
                <Main onFormSubmit={this.shortenUrl} hasError={this.state.hasError} urls={this.state.shortUrls} />
                <Footer />
            </div>
        );
    }
}

export default App;