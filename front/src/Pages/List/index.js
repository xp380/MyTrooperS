import React from "react";
import Todo from "./Todo";
import "./List.css";

const List = (props) => {
  const todoList = props;
  console.log("dataList", props.removeTodoListProp);
  const renderedList = todoList.list.map((item) => (
    <Todo
      title={item.title}
      removeTodoItemProp={(e) => props.removeTodoListProp(item._id)}
      key={item.title}
      description={item.description}
    />
  ));
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Ma Liste</h1>
      {renderedList}
    </div>
  );
};

export default List;
