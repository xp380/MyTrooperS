import { Tabs } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "./Context/UserContext";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./Components/HomePage/index";

function App() {
  const { TabPane } = Tabs;

  const [currentTab, setCurrentTab] = useState("login");
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return userContext.token === null ? (
    <div>
      <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
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
