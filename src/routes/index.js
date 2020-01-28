import React from "react";
import { Switch } from "react-router-dom";
import Route from "./route";

import About from '../components/about';
import Eko from "../components/eko";
import Home from '../components/home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/eko" component={Eko} />
    </Switch>
  );
}