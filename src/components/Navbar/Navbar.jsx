import { useContext } from "react";
import style from "./Navbar.module.css";
import { UserContext } from "../../context/UserContest/UserContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "./../../assets/freshcart-logo.svg";
import { cartContext } from "../../context/UserContest/CartContext";
export default function Navbar() {
  let { token, setToken, setNameOfUser, NameOfUser } = useContext(UserContext);

  let { numbOfCarts, setNumbOfCarts } = useContext(cartContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userName");
    localStorage.removeItem("user token");
    localStorage.removeItem("userId");
    setNumbOfCarts(0);
    setNameOfUser(null);
    setToken(null);
    navigate("/login");
  }
  let [toggle, setToggle] = useState(false);
  function handleToggle() {
    setToggle(!toggle);
  }
  return (
    <nav
      className={` bg-slate-100 py-6 fixed top-0 right-0 left-0 z-50 dark:bg-slate-900  dark:text-white`}
    >
      <div className="container">
        <div className="row tablet:items-center  justify-center flex-col   tablet:flex-row">
          <div className="  flex justify-between    tablet:pb-1">
            <Link to={""}>
              <img src={logo} alt="" />
            </Link>
            <button onClick={handleToggle} className="w-10 tablet:hidden">
              <i className="fa-solid fa-sliders text-2xl "></i>
            </button>
          </div>
          <div
            className={`flex justify-between grow    tablet:flex-row  ${
              toggle ? "flex-col tablet:flex-row" : "hidden tablet:flex"
            }`}
          >
            <ul className=" flex  flex-col   tablet:flex-row  dark:text-slate-200">
              {token && (
                <>
                  {" "}
                  <li className=" mx-2 tablet:ms-4  ">
                    <NavLink
                      onClick={handleToggle}
                      to={""}
                      className=" text-slate-500  hover:text-green-400"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className=" mx-2 ">
                    <NavLink
                      onClick={handleToggle}
                      to={"cart"}
                      className="text-slate-500 hover:text-green-400"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li className=" mx-2 ">
                    <NavLink
                      onClick={handleToggle}
                      to={"wishList"}
                      className="text-slate-500 hover:text-green-400"
                    >
                      wish list
                    </NavLink>
                  </li>
                  <li className=" mx-2 ">
                    <NavLink
                      onClick={handleToggle}
                      to={"products"}
                      className="text-slate-500 hover:text-green-400"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className=" mx-2 ">
                    <NavLink
                      onClick={handleToggle}
                      to={"categories"}
                      className="text-slate-500 hover:text-green-400"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className=" mx-2 ">
                    <NavLink
                      onClick={handleToggle}
                      to={"brands"}
                      className="text-slate-500 hover:text-green-400"
                    >
                      Brands
                    </NavLink>
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
                <button
                  className="text-slate-500 hover:text-green-400"
                  onClick={logOut}
                >
                  Logout
                </button>
              ) : (
                <>
                  {" "}
                  <li className=" mx-2 ">
                    <NavLink
                      onClick={handleToggle}
                      to={"Login"}
                      className="text-slate-500 hover:text-green-400"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className=" mx-2 ">
                    <NavLink
                      onClick={handleToggle}
                      to={"Register"}
                      className="text-slate-500 hover:text-green-400"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                {NameOfUser && (
                  <Link
                    className=" text-green-500   font-bold mx-3  hover:text-green-800 dark:hover:text-green-400"
                    to={"cart"}
                    onClick={handleToggle}
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
