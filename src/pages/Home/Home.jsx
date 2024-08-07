import CategoreySlider from "../../components/CategoreySlider/CategoreySlider";
import MainProducts from "../../components/MainProducts/MainProducts";
import MainSlider from "../../components/MainSlider/MainSlider";
import style from "./Home.module.css";
import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <MainSlider />
      <CategoreySlider />
      <MainProducts />
    </>
  );
}
