import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { Offline } from "react-detect-offline";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./context/UserContest/CartContext";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import WishList from "./pages/WishList/WishList";
import Checkout from "./pages/Checkout/Checkout";
import AllOrders from "./pages/AllOrders/AllOrders";
import WishListContextProvider from "./context/UserContest/WishListContext";

let query = new QueryClient();
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
        {
          path: "checkOut",
          element: (
            <Protected>
              <Checkout />
            </Protected>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <Protected>
              <ProductDetails />
            </Protected>
          ),
        },

        {
          path: "wishList",
          element: (
            <Protected>
              <WishList />
            </Protected>
          ),
        },
        {
          path: "forgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "allorders",
          element: (
            <Protected>
              <AllOrders />
            </Protected>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <Offline>
              <div className="  fixed bottom-1 right-3 z-50 bg-red-600 p-4 rounded text-white hover:bg-red-950 duration-700 ">
                You Are Offline
              </div>
            </Offline>
            <Toaster />
            <RouterProvider router={routes}></RouterProvider>
            <ReactQueryDevtools />
          </CartContextProvider>
        </WishListContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
