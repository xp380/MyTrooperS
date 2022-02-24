import React from "react";
import "./Todo.css";

const Todo = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Page de Formulaire</h1>
      <form className="formulaire">
        <input type="text" style={{ width: 200, marginLeft: 700 }}></input>
        <br />
        <input
          type="text"
          style={{ width: 200, marginLeft: 700, marginTop: 20 }}
        ></input>{" "}
        <br />
        <button style={{ marginLeft: 750, marginTop: 30 }}>Submit</button>
      </form>
    </div>
  );
};

export default Todo;
