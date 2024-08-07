import { Outlet } from "react-router-dom";
import style from "./Layout.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className=" container mt-[72px] sheight">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
