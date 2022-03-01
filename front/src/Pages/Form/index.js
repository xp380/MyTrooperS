import React, { useState } from "react";
import "./Form.css";

const Form = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueDescription, setInputValueDescription] = useState("");
  const [inputValueStatut, setInputValueStatut] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputDescription = (e) => {
    setInputValueDescription(e.target.value);
  };

  const handleInputStatut = (e) => {
    setInputValueStatut(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return; // Pour éviter d'envoyer une donnée vide
    if (inputValueDescription.trim() === "") return;
    addTodo({
      title: inputValue,
      description: inputValueDescription,
      statut: inputValueStatut,
      completed: false,
    });
    setInputValue("");
    setInputValueDescription("");
  };

  return (
    <div>
      <h1 className="formTitle">Page de Formulaire</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your title"
          className="formInput"
        />
        <br />
        <input
          value={inputValueDescription}
          onChange={handleInputDescription}
          type="text"
          placeholder="Enter your description"
          className="formInput2"
        />
        <br />
        <select
          className="formInput2"
          value={inputValueStatut}
          onChange={(e) => handleInputStatut(e)}
          type="select"
        >
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
          <option value="A faire">A faire</option>
        </select>
        <button style={{ marginLeft: 750, marginTop: 30 }}>Submit</button>
      </form>
    </div>
  );
};

export default Form;
