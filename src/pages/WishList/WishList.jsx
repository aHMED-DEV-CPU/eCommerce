import { Helmet } from "react-helmet";
import style from "./WishList.module.css";
import { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../context/UserContest/WishListContext";
import { cartContext } from "../../context/UserContest/CartContext";

export default function WishList() {
  const { getLoggedWishList, removeProductFromWishList } =
    useContext(WishListContext);
  let { AddToCart, setNumbOfCarts } = useContext(cartContext);
  let [allProducts, setAllProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  //add to cart
  async function handleAddToCart(cartId) {
    let { data } = await AddToCart(cartId);
    setNumbOfCarts(data?.numOfCartItems);
    console.log(data.numOfCartItems);
  }
  //get all products
  async function handleGetWish() {
    setLoading(true);

    try {
      const { data } = await getLoggedWishList();
      setAllProducts(data?.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    handleGetWish();
  }, []);
  //delete item
  async function deleteItem(id) {
    setLoading(true);
    try {
      let { data } = await removeProductFromWishList(id);
      let restProducts = data.data.filter((product) => product !== id);

      const restProductsSet = structuredClone(restProducts);

      const finallProducts = allProducts.filter((product) =>
        restProductsSet.includes(product?.id)
      );

      console.log(finallProducts);
      setAllProducts(finallProducts);

      console.log(allProducts[0].id);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Helmet>
        <title>WishList</title>
      </Helmet>
      <div className="relative shadow-md rounded-lg w-5/6 mx-auto p-12 bg-[#f8f9fa]">
        <div className="w-full">
          <div className=" flex justify-between items-center  mb-4 ">
            <h2 className="  text-xl md:text-3xl font-bold">My wish list</h2>
          </div>
          <div>
            {allProducts.map((product) => (
              <div
                className=" md:flex  pt-6  border-b mx-3 pb-3"
                key={product?.id}
              >
                <div className="  w-full md:w-1/6   ">
                  <div>
                    <img src={product?.imageCover} alt={product?.title} />
                  </div>
                </div>
                <div className=" flex justify-between grow md:ps-4 items-center">
                  <div>
                    <h5 className=" my-2 md:text-xl ">
                      {product?.title?.split(" ").slice(0, 3).join(" ")}
                    </h5>
                    <h6 className=" my-2 text-green-600">
                      {product?.price} EGP
                    </h6>
                    <button
                      className="text-red-600 "
                      onClick={() => deleteItem(product?.id)}
                    >
                      <i className="fa-solid fa-trash inline-block pe-1 "></i>
                      Remove
                    </button>
                  </div>
                  <button
                    className=" border border-green-500 rounded-lg p-3 text-xl"
                    onClick={() => {
                      handleAddToCart(product?.id);
                      deleteItem(product?.id);
                    }}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {loading && (
          <div className="      loaderContainer">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </>
  );
}

// ); }) ) : (
// <div className=" text-center my-14 text-2xl">Your cart is empty</div>
// )}
