import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/index";
import List from "./Pages/List/index";
import Search from "./Pages/Search/index";

const App = () => {
  return (
    <Router>
      <Switch>
        <Header />
        <Route path="/list" component={List} />
        <Route path="/search" component={Search} />
      </Switch>
      <List />
    </Router>
  );
};

export default App;
