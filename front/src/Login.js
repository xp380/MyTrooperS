import React, { useContext, useState } from "react";
import { UserContext } from "./Context/UserContext";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    fetch(process.env.REACT_APP_API_ENDPOINT + "users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Invalid email and password combination.");
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
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: "200px",
          padding: "10px 0px",
          margin: "0 auto",
        }}
        onSubmit={formSubmitHandler}
      >
        <input
          id="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: 20 }}
        />
        <button
          disabled={isSubmitting}
          text={`${isSubmitting ? "Signing In" : "Sign In"}`}
          type="submit"
          style={{ marginTop: "20px", width: 150, marginLeft: 25 }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
