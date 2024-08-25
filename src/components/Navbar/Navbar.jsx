import { useContext } from "react";
import style from "./Navbar.module.css";
import { UserContext } from "../../context/UserContest/UserContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "./../../assets/freshcart-logo.svg";
import { cartContext } from "../../context/UserContest/CartContext";
export default function Navbar() {
  let { token, setToken, setNameOfUser, NameOfUser } = useContext(UserContext);
  let { numbOfCarts } = useContext(cartContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userName");
    localStorage.removeItem("user token");
    setNameOfUser(null);
    setToken(null);
    navigate("/login");
  }
  let [toggle, setToggle] = useState(false);
  function handleToggle() {
    setToggle(!toggle);
  }
  return (
    <nav className=" bg-slate-100 py-4 fixed top-0 right-0 left-0 z-50">
      <div className="container">
        <div className="row tablet:items-center  justify-center flex-col   tablet:flex-row">
          <div className="  flex justify-between    tablet:pb-1">
            <Link to={""}>
              <img src={logo} alt="" />
            </Link>
            <button onClick={handleToggle}>
              <img
                src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"
                alt=""
                className="  w-10 tablet:hidden"
              />
            </button>
          </div>
          <div
            className={`flex justify-between grow    tablet:flex-row  ${
              toggle ? "flex-col tablet:flex-row" : "hidden tablet:flex"
            }`}
          >
            <ul className=" flex  flex-col   tablet:flex-row">
              {token && (
                <>
                  {" "}
                  <li className=" mx-2 tablet:ms-4 text-slate-600">
                    <NavLink to={""}>Home</NavLink>
                  </li>
                  <li className=" mx-2 text-slate-600">
                    <NavLink to={"cart"}>Cart</NavLink>
                  </li>
                  <li className=" mx-2 text-slate-600">
                    <NavLink to={"wishList"}>wish list</NavLink>
                  </li>
                  <li className=" mx-2 text-slate-600">
                    <NavLink to={"products"}>Products</NavLink>
                  </li>
                  <li className=" mx-2 text-slate-600">
                    <NavLink to={"categories"}>Categories</NavLink>
                  </li>
                  <li className=" mx-2 text-slate-600">
                    <NavLink to={"brands"}>Brands</NavLink>
                  </li>
                </>
              )}
            </ul>
            <ul className=" flex  flex-col   tablet:flex-row ">
              <li className=" mx-2">
                <i className="fa-brands fa-instagram"></i>
              </li>
              <li className=" mx-2">
                <i className="fa-brands fa-facebook"></i>
              </li>
              <li className=" mx-2">
                <i className="fa-brands fa-tiktok"></i>
              </li>
              <li className=" mx-2">
                <i className="fa-brands fa-twitter"></i>
              </li>
              <li className=" mx-2">
                <i className="fa-brands fa-linkedin"></i>
              </li>
              <li className=" mx-2">
                <i className="fa-brands fa-youtube"></i>
              </li>

              {token ? (
                <button className="text-slate-600" onClick={logOut}>
                  Logout
                </button>
              ) : (
                <>
                  {" "}
                  <li className=" mx-2 text-slate-600">
                    <NavLink to={"Login"}>Login</NavLink>
                  </li>
                  <li className=" mx-2 text-slate-600">
                    <NavLink to={"Register"}>Register</NavLink>
                  </li>
                </>
              )}
              <li>
                {NameOfUser && (
                  <Link
                    className=" text-green-500  font-bold mx-3  hover:text-green-800"
                    to={"cart"}
                  >
                    {NameOfUser}
                    <div className=" relative inline">
                      <i className="fa-solid fa-cart-shopping relative  text-2xl"></i>
                      {numbOfCarts !== 0 && (
                        <span className=" absolute  text-white w-5 h-5 bg-black rounded-full -top-3 left-3 flex justify-center items-center">
                          {numbOfCarts}
                        </span>
                      )}
                    </div>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

//
