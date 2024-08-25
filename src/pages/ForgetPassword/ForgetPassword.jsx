import { Helmet } from "react-helmet";
import style from "./ForgetPassword.module.css";
import axios from "axios";

export default function ForgetPassword() {
  function handleEmail() {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email: "ahmedmuti@gmail.com",
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
  return (
    <>
      <Helmet>
        <title>forgetpassword</title>
      </Helmet>
      <div className="  pt-5">
        <label
          htmlFor="first_name"
          className="block mb-2  font-medium text-green-500 dark:text-white text-2xl"
        >
          Enter Your Email
        </label>
        <input
          type="email"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder="Email"
          required
        />
      </div>
    </>
  );
}
