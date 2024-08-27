import axios from "axios";
import React, { createContext } from "react";

export let WishListContext = createContext();
export default function WishListContextProvider(props) {
  // let headers = {
  //   token: localStorage.getItem("user token"),
  // };
  function addToWisList(productId) {
    let headers = {
      token: localStorage.getItem("user token"),
    };
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((data) => data)
      .catch((error) => error);
  }
  function getLoggedWishList() {
    let headers = {
      token: localStorage.getItem("user token"),
    };
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((data) => data)
      .catch((error) => console.log(error));
  }
  function removeProductFromWishList(id) {
    let headers = {
      token: localStorage.getItem("user token"),
    };
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      })
      .then((data) => data)
      .catch((error) => error);
  }
  return (
    <WishListContext.Provider
      value={{ addToWisList, getLoggedWishList, removeProductFromWishList }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
