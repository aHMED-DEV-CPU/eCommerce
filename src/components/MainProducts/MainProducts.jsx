import axios from "axios";
import style from "./MainProducts.module.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecentProducts from "../RecentProducts/RecentProducts";
import { cartContext } from "../../context/UserContest/CartContext";
import toast from "react-hot-toast";
import Pagination from "../Pagination/Pagination";
import { WishListContext } from "../../context/UserContest/WishListContext";
export default function MainProducts() {
  let { AddToCart, setNumbOfCarts, getLogged } = useContext(cartContext);
  const [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [productsOfSearch, setProductsOfSearch] = useState([]);

  //pagination
  function getProducts(pageNum = 1) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`)
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getProducts();
  }, []);
  async function getNumberOfCarts() {
    let { data } = await getLogged();
    // if (data.numOfCartItems) {
    setNumbOfCarts(data.numOfCartItems);
    // }
  }
  useEffect(() => {
    getNumberOfCarts();
  }, []);

  //add to cart and the message
  async function handleAddToCart(productId) {
    setLoading(true);
    try {
      let { data } = await AddToCart(productId);

      setNumbOfCarts(data?.numOfCartItems);
      toast(data?.message, {
        duration: 2000,
        position: "top-right",

        // Styling
        style: {
          backgroundColor: "green",
          color: "white",
        },
        className: "",

        // Custom Icon
        icon: "👏",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // add to wishList

  let { addToWisList, getLoggedWishList } = useContext(WishListContext);
  let [loggedWish, setLoggedWish] = useState([]);
  async function handleLoggedWishList() {
    try {
      const { data } = await getLoggedWishList();

      setLoggedWish(data?.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  useEffect(() => {
    handleLoggedWishList();
  }, [loggedWish]);

  async function handleAddTOWishList(id) {
    setLoading(true);
    try {
      let { data } = await addToWisList(id);

      toast(data?.message, {
        duration: 2000,
        position: "top-right",

        // Styling
        style: {
          backgroundColor: "green",
          color: "white",
        },
        className: "",

        // Custom Icon
        icon: "👏",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  //pagination
  function handlePageClick({ selected }) {
    getProducts(selected + 1);
  }

  //input value
  const [inputValue, setInputValue] = useState("");
  function handleChange(event) {
    const newVal = event.target.value;
    setInputValue(newVal);

    const filteredProducts = data?.data?.filter((product) =>
      product.title.toLowerCase().includes(newVal.toLowerCase())
    );
    setProductsOfSearch(filteredProducts);
  }

  function isInWishlist(productId) {
    for (const item of loggedWish) {
      if (item.id === productId) {
        return true;
      }
    }
    return false;
  }
  return data?.data?.length ? (
    <>
      <div className="  flex justify-center my-4 pt-4">
        <input
          type="text"
          placeholder="search.."
          className={` border border-slate-200 rounded w-3/4  p-2    outline-none  `}
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      <div className=" row w-11/12 mx-auto">
        {inputValue.length === 0
          ? data.data?.map((product) => (
              <div
                key={product?.id}
                className="w-full sm:w-1/2    md:w-1/3 lg:w-1/4 px-6"
              >
                <div className="   cursor-pointer product py-5">
                  <Link to={`/productdetails/${product?.id}`}>
                    <RecentProducts
                      product={product}
                      handleAddTOWishList={handleAddTOWishList}
                    />
                  </Link>
                  <div className=" flex justify-end">
                    <button
                      className={`fa-solid fa-heart   text-3xl mt-2 mr-3 ${
                        isInWishlist(product?.id) && "text-red-600"
                      } `}
                      onClick={() => handleAddTOWishList(product?.id)}
                    ></button>
                  </div>
                  <button
                    className=" btn w-3/4 bg-green-700 mx-auto block text-white rounded py-2  "
                    onClick={() => {
                      handleAddToCart(product?.id);
                    }}
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))
          : productsOfSearch?.map((product) => (
              <div
                key={product?.id}
                className="w-full sm:w-1/2    md:w-1/3 lg:w-1/4 px-6"
              >
                <div className="   cursor-pointer product py-5">
                  <Link to={`/productdetails/${product?.id}`}>
                    <RecentProducts
                      product={product}
                      handleAddTOWishList={handleAddTOWishList}
                    />
                  </Link>
                  <div className=" flex justify-end">
                    <button
                      className={`fa-solid fa-heart   text-3xl mt-2 mr-3  ${
                        isInWishlist(product?.id) && "text-red-600"
                      } `}
                      onClick={() => handleAddTOWishList(product?.id)}
                    ></button>
                  </div>
                  <button
                    className=" btn w-3/4 bg-green-700 mx-auto block text-white rounded py-2  "
                    onClick={() => {
                      handleAddToCart(product?.id);
                    }}
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
        <div className="   flex justify-center w-full my-5 py-6">
          <Pagination
            handlePageClick={handlePageClick}
            pageCount={data.metadata?.numberOfPages}
          />
        </div>
        {loading && (
          <div className="      loaderContainer">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </>
  ) : (
    <div className="      loaderContainer">
      <div className="loader"></div>
    </div>
  );
}
