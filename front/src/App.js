import { Tabs } from "antd";
import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./Pages/HomePage";

function App() {
  const { TabPane } = Tabs;
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((test) => {
          return { ...test, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 10 minutes to renew the authentication token.
      setTimeout(verifyUser, 10 * 60 * 1000);
    });
  }, [setUserContext]);

  // const verifyUser = useCallback(() => {
  //   axios
  //     .post(process.env.REACT_APP_API_ENDPOINT + "users/refreshToken")
  //     .then(async (response) => {
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserContext((test) => {
  //           return { ...test, token: data.token };
  //         });
  //       } else {
  //         setUserContext((oldValues) => {
  //           return { ...oldValues, token: null };
  //         });
  //       }
  //       setTimeout(verifyUser, 10 * 60 * 1000);
  //     });
  // }, [setUserContext]

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  // Pour ce useEffect, la fonction verifyUser s'affiche seulement lorsque le composant se met à jour
  return userContext.token === null ? (
    <div>
      <Tabs>
        <TabPane tab="Login" key="1">
          <Login />
        </TabPane>
        <TabPane tab="Register" key="2">
          <Register />
        </TabPane>
      </Tabs>
    </div>
  ) : userContext.token ? (
    <HomePage />
  ) : (
    <p>Chargement ...</p>
  );
}

export default App;
