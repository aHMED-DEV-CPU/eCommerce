import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("user token"),
  };
  function AddToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }

  let [cartId, setCartId] = useState("");
  function getLogged() {
    return axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/cart",

        {
          headers,
        }
      )
      .then((data) => {
        setCartId(data.data.data._id);
        console.log(data.data.data._id);

        return data;
      })
      .catch((error) => {
        return error;
      });
  }
  function removeItem(id) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

        {
          headers,
        }
      )
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
  function updateCount(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },

        {
          headers,
        }
      )
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
  function removeAll() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
  let [numbOfCarts, setNumbOfCarts] = useState("");
  async function getNumberOfCarts() {
    let { data } = await getLogged();
    setNumbOfCarts(data.numOfCartItems);
  }
  async function onlinePayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress },
        { headers, params: { url: "http://localhost:5173" } }
      )
      .then((data) => data)
      .catch((error) => error);
  }

  useEffect(() => {
    getNumberOfCarts();
  }, []);
  return (
    <cartContext.Provider
      value={{
        AddToCart,
        getLogged,
        removeItem,
        updateCount,
        removeAll,
        numbOfCarts,
        setNumbOfCarts,
        onlinePayment,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
