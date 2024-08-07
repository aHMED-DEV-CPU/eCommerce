import style from "./NotFound.module.css";
import image from "../../assets/error/error.svg";
import { Helmet } from "react-helmet";
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <div className=" sheight flex justify-center items-center">
        <img src={image} alt="" />
      </div>
    </>
  );
}
