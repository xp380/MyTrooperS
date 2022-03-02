import React, { useState } from "react";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./Todo.css";

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

  const [valueStatut, setValueStatut] = useState(statut);
  const [tempValueStatut, setTempValueStatut] = useState(statut);

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

  const handleInputKeyDownDescription = (e) => {
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

  const handleInputKeyDownStatut = (e) => {
    const key = e.keyCode;

    if (key === 13) {
      editTodoItemProp({ statut: tempValueStatut });
      setValueStatut(tempValueStatut);
      setIsEditing(false);
    } else if (key === 27) {
      setTempValueStatut(valueStatut);
      setIsEditing(false);
    }
  };

  const handleInputStatutOnChange = (e) => {
    setTempValueStatut(e.target.value);
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
            onKeyDown={handleInputKeyDownDescription}
            autoFocus={true}
            value={tempValueDescription}
          />
          <input
            onChange={handleInputStatutOnChange}
            onKeyDown={handleInputKeyDownStatut}
            autoFocus={true}
            value={tempValueStatut}
          />
        </>
      ) : (
        <div className="CardList">
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

            <p style={{ textAlign: "center" }}>
              {statut !== "Terminé" ? (
                <p style={{ color: "red" }}>{statut}</p>
              ) : (
                <p style={{ color: "green" }}>{statut}</p>
              )}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Todo;
