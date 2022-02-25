import React, { useState } from "react";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const Todo = ({ title, description, removeTodoItemProp, editTodoItemProp }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [tempValue, setTempValue] = useState(title);
  console.log("test", removeTodoItemProp);
  const handleDivDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputKeyDown = (e) => {
    const key = e.keyCode;

    if (key === 13) {
      editTodoItemProp({ title: tempValue });
      setValue(tempValue);
      setIsEditing(false);
    } else if (key === 27) {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  const handleInputOnChange = (e) => {
    setTempValue(e.target.value);
  };
  return (
    <div onDoubleClick={handleDivDoubleClick}>
      {isEditing ? (
        <input
          onChange={handleInputOnChange}
          onKeyDown={handleInputKeyDown}
          autoFocus={true}
          value={tempValue}
        />
      ) : (
        <div style={{ display: "block", width: "100%" }}>
          <Card
            title={value}
            extra={
              <div onClick={removeTodoItemProp}>
                <DeleteOutlined />
              </div>
            }
            style={{ width: 300, marginLeft: 100, float: "left", margin: 10 }}
          >
            <p>{description}</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Todo;
