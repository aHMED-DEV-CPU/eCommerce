import style from "./MainSlider.module.css";
import React from "react";
import Slider from "react-slick";
const images = Object.values(
  import.meta.glob("../../assets/mainSlider/*{png ,jpg,jpeg,PNG,JPEG}", {
    eager: true,
    as: "url",
  })
);
import image1 from "../../assets/sideSlider/grocery-banner-2.jpeg";
import image2 from "../../assets/sideSlider/grocery-banner.png";
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
};

export default function MainSlider() {
  return (
    <div>
      <div className="flex my-5 pt-3">
        <div className=" w-full  md:w-3/4 ">
          <Slider {...settings}>
            {" "}
            {images.map((image, i) => (
              <img src={image} alt="" key={i} className=" h-[400px]" />
            ))}
          </Slider>
        </div>
        <div className=" hidden md:w1/4 md:block">
          <img src={image1} alt="" className=" h-[200px]" />
          <img src={image2} alt="" className=" h-[200px]" />
        </div>
      </div>
    </div>
  );
}
