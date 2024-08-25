import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user token")) {
      setToken(localStorage.getItem("user token"));
    }
  }, []);
  const [NameOfUser, setNameOfUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userName")) {
      setNameOfUser(localStorage.getItem("userName"));
    }
  }, []);
  return (
    <UserContext.Provider
      value={{ token, setToken, NameOfUser, setNameOfUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
