import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="general">
      <Router>
        <p>
          <a style={{ marginLeft: "40px" }} href="/list">
            List
          </a>
          <a style={{ marginLeft: "40px" }} href="/search">
            Search
          </a>
        </p>
      </Router>
    </div>
  );
}
