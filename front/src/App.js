// import React from "react";
// import HomePage from "./Components/HomePage/index";

// const App = () => {
//   return (
//     <div>
//       <HomePage />
//     </div>
//   );
// };

// export default App;

import { Tabs } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "./Context/UserContext";
import Login from "./Login";
import Register from "./Register";
import Welcome from "./Welcome";

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

  /**
   * Sync logout across tabs
   */
  const syncLogout = useCallback((event) => {
    if (event.key === "logout") {
      // If using react-router-dom, you may call history.push("/")
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [syncLogout]);

  return userContext.token === null ? (
    <div>
      <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
        <TabPane tab="Login" key="1">
          <Login />
        </TabPane>
        <TabPane tab="Regiseter" key="2">
          <Register />
        </TabPane>
      </Tabs>
    </div>
  ) : userContext.token ? (
    <Welcome />
  ) : (
    <p>Chargement ...</p>
  );
}

export default App;
