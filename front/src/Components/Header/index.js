import React from "react";
import { PageHeader, Button } from "antd";
import "./Header.css";
import { BrowserRouter as Router } from "react-router-dom";

const Header = () => {
  const Titre = <div className="HeadLine">My Troopers</div>;

  return (
    <Router>
      <div className="header-ghost-wrapper">
        <PageHeader
          ghost={true}
          title={Titre}
          extra={[
            <Button className="Button" key="2">
              <a href="/list">List</a>
            </Button>,
            <Button className="Button" key="3">
              <a href="/search">Search</a>
            </Button>,
          ]}
        />
      </div>
    </Router>
  );
};
export default Header;
