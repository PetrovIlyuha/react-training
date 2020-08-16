import React from "react";
import "./App.css";
import Tab from "./Tab";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="browser">
          <div className="tabs">
            <NavLink exact to="/">
              <Tab title="Home" path="/" />
            </NavLink>
            <NavLink to="/about">
              <Tab title="About" path="/about" />
            </NavLink>
            <NavLink to="/features">
              <Tab title="Features" path="/features" />
            </NavLink>
          </div>
          <div className="viewport">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/features">
                <Features />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
