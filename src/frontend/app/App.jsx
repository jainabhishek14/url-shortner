import React, {Component} from "react";
import {Header, Footer, Main} from "./components/index.jsx";
import "./App.scss";

class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}

export default App;