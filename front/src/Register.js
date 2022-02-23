// import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useContext, useState } from "react";
import { UserContext } from "./Context/UserContext";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userContext, setUserContext] = useContext(UserContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    fetch(process.env.REACT_APP_API_ENDPOINT + "users/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username: email, password }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Invalid email and password combination.");
          } else if (response.status === 500) {
            console.log(response);
            const data = await response.json();
            if (data.message) setError(data.message || genericErrorMessage);
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, token: data.token };
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };

  return (
    <>
      {error && <p>{error}</p>}

      <form
        onSubmit={formSubmitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: "200px",
          padding: "10px 0px",
          margin: "0 auto",
        }}
      >
        <input
          id="firstName"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          style={{ marginTop: 20 }}
        />
        <input
          id="lastName"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          style={{ marginTop: 20 }}
        />

        <input
          id="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: 20 }}
        />

        <input
          id="password"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: 20 }}
        />
        <button
          disabled={isSubmitting}
          text={`${isSubmitting ? "Registering" : "Register"}`}
          type="submit"
          style={{ marginTop: 20, width: 150, marginLeft: 25 }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Register;
