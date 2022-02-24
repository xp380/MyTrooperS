import React from "react";
import "./List.css";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";

const List = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Ma Liste</h1>
      <div style={{ display: "flex", marginLeft: 200 }}>
        Item
        <div style={{ color: "green" }}>
          <CheckOutlined />
        </div>
        <div style={{ color: "red" }}>
          <DeleteOutlined />
        </div>
      </div>
    </div>
  );
};

export default List;
