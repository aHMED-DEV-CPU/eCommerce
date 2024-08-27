import { Outlet } from "react-router-dom";
import style from "./Layout.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";

export default function Layout() {
  const [dark, setDark] = useState(false);
  function handleDark() {
    setDark(!dark);
  }
  return (
    <div className={`${dark && "dark"}`}>
      <div className=" dark:bg-slate-800">
        <button
          className="  dark:text-white fixed right-2 bg-green-200  top-[90px] p-3 border  hover:bg-green-500  dark:bg-green-700 dark:border-green-950 rounded-full z-50   "
          onClick={handleDark}
        >
          {" "}
          {dark ? "light" : "dark"}
        </button>
        <Navbar />
        <div className=" container mt-[72px] py-5 sheight">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
