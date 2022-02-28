import React, { useState } from "react";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const Todo = ({
  title,
  description,
  statut,
  removeTodoItemProp,
  editTodoItemProp,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [tempValue, setTempValue] = useState(title);

  const [valueDescription, setValueDescription] = useState(description);
  const [tempValueDescription, setTempValueDescription] = useState(description);
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

  const hanfdeInputKeyDownDescription = (e) => {
    const key = e.keyCode;

    if (key === 13) {
      editTodoItemProp({ description: tempValueDescription });
      setValueDescription(tempValueDescription);
      setIsEditing(false);
    } else if (key === 27) {
      setTempValueDescription(valueDescription);
      setIsEditing(false);
    }
  };

  const handleInputDescriptionOnChange = (e) => {
    setTempValueDescription(e.target.value);
  };
  return (
    <div onDoubleClick={handleDivDoubleClick}>
      {isEditing ? (
        <>
          <input
            onChange={handleInputOnChange}
            onKeyDown={handleInputKeyDown}
            autoFocus={true}
            value={tempValue}
          />
          <input
            onChange={handleInputDescriptionOnChange}
            onKeyDown={hanfdeInputKeyDownDescription}
            autoFocus={true}
            value={tempValueDescription}
          />
        </>
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
            <p style={{ textAlign: "center" }}>{statut}</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Todo;
