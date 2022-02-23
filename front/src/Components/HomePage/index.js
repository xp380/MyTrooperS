import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../Navbar/index";
import List from "../../Pages/List/index";
import Search from "../../Pages/Search";

import "./HomePage.css";

import { Layout } from "antd";
const { Header, Content } = Layout;

export default function HomePage() {
  return (
    <>
      <Router>
        <Layout>
          <Header className="head">
            <Navbar />
            <div className="search">MyTrooperS</div>
          </Header>
          <Content className="content">
            <Switch>
              <Route path="/list" exact>
                <List />
              </Route>
              <Route path="/search" exact>
                <Search />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Router>
    </>
  );
}
