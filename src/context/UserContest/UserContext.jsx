import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();
export default function UserContextProvider(props) {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user token")) {
      setToken(localStorage.getItem("user token"));
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {props.children}
    </UserContext.Provider>
  );
}
