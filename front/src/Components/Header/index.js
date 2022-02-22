import React from "react";
import { PageHeader } from "antd";
import "./Header.css";

const Header = () => {
  const Titre = <div className="HeadLine">My Troopers</div>;

  return (
    <div className="header-ghost-wrapper">
      <PageHeader
        ghost={true}
        title={Titre}
        extra={[
          <a href="/list" className="Button">
            List
          </a>,
          <a href="/search" className="Button">
            Search
          </a>,
        ]}
      />
    </div>
  );
};
export default Header;
