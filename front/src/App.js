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
        <Route path="/list" exact>
          <List />
        </Route>
        <Route path="/search" exact>
          <Search />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
