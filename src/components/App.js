import "antd/dist/antd.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "mobx-react";


// Pages init
import Home from "./Home";

// Store Init
import { 
  StartingStore
} from "../stores";

const startingStore = new StartingStore();

const stores = {
  startingStore
};


class App extends Component {
  render() {
    return (
      <Router>
        <Provider {...stores}>
          <Route exact path="/" component={Home} />
          {/* JUST ADD Additional Routes here */}
          {/* <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} /> */}
        </Provider>
      </Router>
    );
  }
}

export default App;
