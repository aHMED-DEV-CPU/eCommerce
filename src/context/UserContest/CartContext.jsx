import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  // let headers = {
  //   token: localStorage.getItem("user token"),
  // };
  function AddToCart(productId) {
    let headers = {
      token: localStorage.getItem("user token"),
    };
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
  const [userId, setUserId] = useState("");
  function getLogged() {
    let headers = {
      token: localStorage.getItem("user token"),
    };
    return axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/cart",

        {
          headers,
        }
      )
      .then((data) => {
        setCartId(data?.data?.cartId);
        setUserId(data?.data?.data?.cartOwner);
        localStorage.setItem("userId", data?.data?.data?.cartOwner);
        console.log(data?.data?.data?.cartOwner);
        console.log(data?.data?.cartId);

        return data;
      })
      .catch((error) => {
        return error;
      });
  }
  function removeItem(id) {
    let headers = {
      token: localStorage.getItem("user token"),
    };
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
    let headers = {
      token: localStorage.getItem("user token"),
    };
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
    let headers = {
      token: localStorage.getItem("user token"),
    };
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
  let [numbOfCarts, setNumbOfCarts] = useState(0);
  // async function getNumberOfCarts() {
  //   let { data } = await getLogged();

  //   setNumbOfCarts(data.numOfCartItems);
  // }
  //   useEffect(() => {
  //     getNumberOfCarts();
  //   }, []);
  async function onlinePayment(shippingAddress) {
    let headers = {
      token: localStorage.getItem("user token"),
    };

    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress },
        { headers, params: { url: "http://localhost:5173" } }
      )
      .then((data) => {
        return data;
      })
      .catch((error) => error);
  }

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
        userId,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
