import axios from "axios";
import style from "./MainProducts.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function MainProducts() {

  const [products, setProducts] = useState([]);
  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((data) => {
        setProducts(data.data.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getProducts();
  }, []);
  return products.length ? (
    <div className=" row">
      {products.map((product) => (
        <Link
          to={`/productdetails/${product.id}`}
          key={product.id}
          className=" w-full sm:w-1/2    md:w-1/3 lg:w-1/6  cursor-pointer"
        >
          <div className=" p-3 ">
            <img src={product.imageCover} alt={product.title} />
            <h3 className=" text-green-500">{product.category.name}</h3>
            <h6>{product.title.split(" ").slice(0, 2).join(" ")}</h6>
            <div className=" flex justify-between">
              <span>{product.price}EGP</span>
              <span>
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className=" text-slate-500">
                  {product.ratingsAverage}
                </span>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="     h-[80vh] flex justify-center items-center">
      <div className={style.loader}></div>
    </div>
  );
}
