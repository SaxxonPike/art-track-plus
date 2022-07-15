import './app.scss';
import {Component} from "react";
import PropTypes from "prop-types";

class App extends Component {
    render() {
        return (
            <div className="App">
            </div>
        );
    }
}

App.propTypes = {
    test: PropTypes.bool
};

export default App;
