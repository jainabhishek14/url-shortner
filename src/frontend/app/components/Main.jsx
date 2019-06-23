import React, {Component} from "react";
import {ShortenForm, ShortUrlTable} from "./index.jsx";

import "./main.scss";

class Main extends Component{
    constructor(props){
        super(props);
    }

    render (){
        return (
            <div className="main">
                <ShortenForm onFormSubmit={this.props.onFormSubmit} />
                <ShortUrlTable urls={this.props.urls} />
            </div>
        );
    }
}

export default Main;