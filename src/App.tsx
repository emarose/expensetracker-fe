import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Depto from "./pages/Depto";
import Casa from "./pages/Casa";
import French from "./pages/French";
import Accounts from "./pages/Accounts";
import { ExpenseProvider } from "./contexts/ExpenseContext";

const App: React.FC = () => {
  return (
    <Router>
      <ExpenseProvider>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/depto" component={Depto} />
            <Route path="/casa" component={Casa} />
            <Route path="/french" component={French} />
            <Route path="/accounts" component={Accounts} />
          </Switch>
        </div>
      </ExpenseProvider>
    </Router>
  );
};

export default App;
