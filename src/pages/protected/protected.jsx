import { Navigate } from "react-router-dom";
import style from "./protected.module.css";

export default function Protected(props) {
  if (localStorage.getItem("user token")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
