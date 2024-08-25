import { useQuery } from "@tanstack/react-query";
import style from "./Products.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import MainProducts from "../../components/MainProducts/MainProducts";
export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <MainProducts />
    </>
  );
}
