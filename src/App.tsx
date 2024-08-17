import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Depto from "./pages/Depto";
import Casa from "./pages/Casa";
import French from "./pages/French";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/depto" component={Depto} />
        <Route path="/casa" component={Casa} />
        <Route path="/french" component={French} />
      </Switch>
    </Router>
  );
};

export default App;
