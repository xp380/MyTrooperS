import React, { useState } from "react";

const UserContext = React.createContext([{}, () => {}]);

let initialState = {};

const UserProvider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

// La création de contexte va réceptionner le state du user connecté ou inscrit à sa session.
// Durant l'essaie du test, l'user contexte va maintenir sa session active pendant 15 mn
