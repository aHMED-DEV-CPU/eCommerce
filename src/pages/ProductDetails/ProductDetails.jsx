import { useParams } from "react-router-dom";
import style from "./ProductDetails.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
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
  console.log(id);
  let [details, setDetails] = useState({});
  function getDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        setDetails(data.data.data);
        console.log(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDetails();
  }, [details]);
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
          <h2 className=" text-xl my-2">{details.title}</h2>
          <small className=" text-slate-400 ">{details.description}</small>
          <h6 className=" my-2">{details?.category?.name}</h6>
          <div className=" flex justify-between">
            <span>{details?.price}EGP</span>
            <span>
              <i className="fa-solid fa-star text-yellow-400"></i>
              {details?.ratingsAverage}
            </span>
          </div>
          <button className=" rounded text-white bg-green-600 w-full my-3 py-2">
            + add to cart
          </button>
        </div>
      </div>
    </>
  );
}
