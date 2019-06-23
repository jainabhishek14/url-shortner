import React, {Component} from "react";

import "./main.scss";

class Main extends Component{
    render (){
        return (
            <div className="main">
                <form className="main-form">
                    <div className="form-control">
                        <input className="url-input form-input" type="text" placeholder="Shorten your link" />
                    </div>
                    <div className="form-control">
                        <button className="btn shorten-btn">Shorten</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Main;