import { useParams } from "react-router-dom";
import style from "./ProductDetails.module.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { cartContext } from "../../context/UserContest/CartContext";
import toast from "react-hot-toast";
export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  let { id } = useParams();

  let [details, setDetails] = useState({});
  function getDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        setDetails(data.data.data);
      })
      .catch((error) => error);
  }

  useEffect(() => {
    getDetails();
  }, [details]);
  let { AddToCart, setNumbOfCarts } = useContext(cartContext);
  async function handleAddToCart(productId) {
    let { data } = await AddToCart(productId);

    setNumbOfCarts(data?.numOfCartItems);
    toast(data?.message, {
      duration: 4000,
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
  }
  return (
    <>
      <Helmet>
        <title>Productdetails</title>
      </Helmet>

      <div className=" row py-2  items-center md:p-10   ">
        <div className=" w-full md:w-1/4 ">
          <Slider {...settings}>
            {details?.images?.map((image, i) => {
              return <img src={image} alt="" key={i} />;
            })}
          </Slider>
        </div>
        <div className=" w-full  md:w-3/4  p-2">
          <h2 className=" text-xl my-2 dark:text-slate-200">{details.title}</h2>
          <small className=" text-slate-400  dark:text-slate-100 ">
            {details.description}
          </small>
          <h6 className=" my-2 dark:text-slate-200">
            {details?.category?.name}
          </h6>
          <div className=" flex justify-between dark:text-slate-200">
            <span>{details?.price}EGP</span>
            <span>
              <i className="fa-solid fa-star text-yellow-400"></i>
              {details?.ratingsAverage}
            </span>
          </div>
          <button
            className=" rounded text-white bg-green-600 w-full my-3 py-2"
            onClick={() => handleAddToCart(id)}
          >
            + add to cart
          </button>
        </div>
      </div>
    </>
  );
}
