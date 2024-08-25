import { Outlet } from "react-router-dom";
import style from "./Layout.module.css";
import Navbar from "../../components/Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className=" container mt-[72px] sheight">
        <Outlet />
      </div>
    </>
  );
}
