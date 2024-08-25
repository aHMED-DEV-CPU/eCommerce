import axios from "axios";
import style from "./CategoreySlider.module.css";
import { useEffect, useState } from "react";
import Slider from "react-slick";
export default function CategoreySlider() {
  const [products, setProducts] = useState([]);
  function getCategory() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((data) => {
        setProducts(data.data.data);
      })
      .catch((error) => error);
  }
  useEffect(() => {
    getCategory();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className=" my-6">
      <h2 className=" text-xl my-5">Shop Popular Category</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div className="  text-center" key={product._id}>
            <img
              src={product?.image}
              alt={product.name}
              className="h-48  object-contain w-full"
            />
            <h3>{product.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
