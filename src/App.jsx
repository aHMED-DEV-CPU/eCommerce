import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import Home from "./pages/Home/Home";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import UserContextProvider from "./context/UserContest/UserContext";
import Layout from "./pages/Layout/Layout";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import NotFound from "./pages/NotFound/NotFound";
import Protected from "./pages/protected/protected";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { useEffect, useState } from "react";

function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Protected>
              <Home />
            </Protected>
          ),
        },
        {
          path: "cart",
          element: (
            <Protected>
              <Cart />
            </Protected>
          ),
        },
        {
          path: "products",
          element: (
            <Protected>
              <Products />
            </Protected>
          ),
        },
        {
          path: "categories",
          element: (
            <Protected>
              <Categories />
            </Protected>
          ),
        },
        {
          path: "brands",
          element: (
            <Protected>
              <Brands />
            </Protected>
          ),
        },
        { path: "productdetails/:id", element: <ProductDetails /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <Offline>
        <div className="  fixed bottom-1 right-3 z-50 bg-red-600 p-4 rounded text-white hover:bg-red-950 duration-700 ">
          You Are Offline
        </div>
      </Offline>

      <RouterProvider router={routes}></RouterProvider>
    </UserContextProvider>
  );
}

export default App;
