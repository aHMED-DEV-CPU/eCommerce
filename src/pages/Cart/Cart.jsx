import { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { Helmet } from "react-helmet";
import { cartContext } from "../../context/UserContest/CartContext";
import { Link } from "react-router-dom";
export default function Cart() {
  let { getLogged, removeItem, updateCount, removeAll, setNumbOfCarts } =
    useContext(cartContext);
  let [loading, setLoading] = useState(false);
  let [allProducts, setAllProducts] = useState({});

  async function updateTable() {
    setLoading(true);
    try {
      let { data } = await getLogged();
      setNumbOfCarts(data?.numOfCartItems);
      setAllProducts(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // delete item
  async function deleteItem(id) {
    setLoading(true);
    try {
      let { data } = await removeItem(id);
      setAllProducts(data?.data);

      setNumbOfCarts(data?.numOfCartItems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  //updating

  async function updatingQuantity(id, count) {
    setLoading(true);
    try {
      let { data } = await updateCount(id, count);

      setAllProducts(data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function emptyCart() {
    setLoading(true);
    try {
      let { data } = await removeAll();
      setNumbOfCarts(data?.numOfCartItems);

      setAllProducts(data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    updateTable();
  }, []);
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <div className="relative shadow-md rounded-lg w-5/6 mx-auto p-12 bg-[#f8f9fa] dark:bg-white/70">
        <div className="w-full">
          <div className=" flex justify-between items-center  mb-4 ">
            <h2 className="  text-xl md:text-3xl font-bold dark:text-white">
              Cart Shop
            </h2>
            {allProducts?.products && (
              <Link
                className=" bg-blue-500 hover:bg-blue-700 text-white py-3 rounded px-2 md:text-xl hover:text-green-400 "
                to={"/checkOut"}
              >
                check out
              </Link>
            )}
          </div>
          {allProducts?.products && (
            <div className=" flex justify-between ">
              <h3>
                <span className="md:text-2xl  dark:text-white ">
                  total price:
                </span>
                <span className=" text-green-500  inline-block ms-2 md:text-2xl ">
                  {allProducts?.totalCartPrice}
                </span>
              </h3>
              <h3>
                <span className="md:text-2xl dark:text-white  ">
                  total number of items:
                </span>
                <span className=" text-green-500  inline-block ms-2 md:text-2xl">
                  {allProducts?.products?.length}
                </span>
              </h3>
            </div>
          )}

          {allProducts?.totalCartPrice ? (
            allProducts?.products?.map((product) => {
              return (
                <div
                  className=" md:flex  pt-6  border-b mx-3 pb-3"
                  key={product?._id}
                >
                  <div className="  w-full md:w-1/6  ">
                    <div>
                      <img
                        src={product?.product?.imageCover}
                        alt={product?.product?.title}
                      />
                    </div>
                  </div>
                  <div className=" flex justify-between grow md:ps-4 items-center">
                    <div>
                      <h5 className=" my-2 md:text-xl dark:text-white ">
                        {product?.product?.title
                          ?.split(" ")
                          .slice(0, 3)
                          .join(" ")}
                      </h5>
                      <h6 className=" my-2 dark:text-green-500">
                        {product?.price} EGP
                      </h6>
                      <button
                        className="text-red-600 "
                        onClick={() => deleteItem(product?.product?.id)}
                      >
                        <i className="fa-solid fa-trash inline-block pe-1 "></i>
                        Remove
                      </button>
                    </div>
                    <div className=" flex">
                      <button
                        className="fa-solid fa-plus border border-green-600 rounded p-2 text-xs curse-cursor-pointer dark:text-white"
                        onClick={() => {
                          updatingQuantity(
                            product?.product?.id,
                            product?.count + 1
                          );
                        }}
                      ></button>

                      <span className=" inline-block   mx-1 md:mx-4 dark:text-white">
                        {product?.count}
                      </span>
                      <button
                        className="fa-solid fa-minus border border-green-600 rounded p-2 text-xs curse-cursor-pointer dark:text-white"
                        onClick={() => {
                          if (product?.count == 1) {
                            deleteItem(product?.product?.id);
                          } else {
                            updatingQuantity(
                              product?.product?.id,
                              product?.count - 1
                            );
                          }
                        }}
                      ></button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className=" text-center my-14 text-2xl">
              Your cart is empty
            </div>
          )}
          <div>
            <div className=" text-center mt-4 ">
              <button
                className="  border rounded  border-green-500 p-2 text-xl "
                onClick={emptyCart}
              >
                Clear Your Cart
              </button>
            </div>
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
