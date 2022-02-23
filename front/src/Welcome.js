// import { Button, Card } from "@blueprintjs/core";
import React, { useCallback, useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";

const Welcome = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/me", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, details: data };
        });
      } else {
        if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          window.location.reload();
        } else {
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  const refetchHandler = () => {
    // set details to undefined so that spinner will be displayed and
    // fetchUserDetails will be invoked from useEffect
    setUserContext((oldValues) => {
      return { ...oldValues, details: undefined };
    });
  };

  const logoutHandler = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      setUserContext((oldValues) => {
        return { ...oldValues, details: undefined, token: null };
      });
      window.localStorage.setItem("logout", Date.now());
    });
  };

  return userContext.details === null ? (
    "Error Loading User details"
  ) : !userContext.details ? (
    <p>Chargement...</p>
  ) : (
    <div>
      <div className="user-details">
        <div>
          <p>
            Welcome&nbsp;
            <strong>
              {userContext.details.firstName}
              {userContext.details.lastName &&
                " " + userContext.details.lastName}
            </strong>
            !
          </p>
        </div>
        <div>
          <button onClick={refetchHandler} style={{ marginLeft: 20 }}>
            Refetch
          </button>
          <button onClick={logoutHandler} style={{ marginLeft: 20 }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
