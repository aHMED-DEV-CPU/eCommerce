import axios from "axios";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContest/UserContext";
import { Helmet } from "react-helmet";
export default function Login() {
  let navigate = useNavigate();
  let { setToken } = useContext(UserContext);
  let validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .matches(/^[a-zA-Z0-9]{6,15}$/, "password is not valid"),
  });
  let [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handleLogin(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((data) => {
        if (data.data.message === "success") {
          setToken(data.data.token);
          console.log(data.data.token);

          localStorage.setItem("user token", data.data.token);
          setIsLoading(false);
          navigate("/");
        }
        console.log(data);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setIsLoading(false);
        console.log(error.response.data.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>login</title>
      </Helmet>
      {error && <h2 className=" text-red-700">{error}</h2>}
      <form
        className=" tablet:w-3/4 w-full mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <h2 className=" text-green-600 text-2xl mb-4">Login Now</h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            name="email"
            value={formik.values.email}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-900 focus:outline-none focus:ring-0 focus:border-green-900 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-900 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email && (
            <span className=" text-red-500 mt-3">{formik.errors.email}</span>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            name="password"
            value={formik.values.password}
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-900 focus:outline-none focus:ring-0 focus:border-green-900 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-900 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <span className=" text-red-500 mt-3">{formik.errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <div className="loader"></div> : "submit"}
        </button>
      </form>
    </>
  );
}
