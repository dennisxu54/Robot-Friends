import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from "./pages/home-page";
import ShowRobotList from "./pages/robot-list";

const App = () => {

  return (
    <div>
    <Router>
    
    <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/page/:pageNumber">
            <ShowRobotList />
          </Route>
        </Switch>
    </Router>
    </div>
  );
};

export default App;
