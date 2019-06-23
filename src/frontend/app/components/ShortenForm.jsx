import React, {Component} from "react";

import "./short-form.scss";

class ShortenForm extends Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            url: ""
        };
    }

    handleChange(event) {
        this.setState({ url: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state.url);
    }

    render(){
        return (
            <form className="main-form">
                <div className="form-control">
                    <input className="url-input form-input"
                        onChange={this.handleChange}
                        type="text" placeholder="Shorten your link"
                        value={this.state.url}
                    />
                </div>
                <div className="form-control">
                    <button className="btn shorten-btn"
                        onClick={this.handleSubmit}
                    >Shorten</button>
                </div>
            </form>
        )
    }
}

export default ShortenForm;