import axios from "axios";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContest/UserContext";
import { Helmet } from "react-helmet";
export default function Login() {
  let navigate = useNavigate();
  let { setToken, setNameOfUser } = useContext(UserContext);
  let validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .matches(
        /^[A-Za-z][A-Za-z0-9]{5,8}$/gm,
        `must be
        <br>
* Start with a letter (either uppercase or lowercase).
<br>
* Be between 6 and 9 characters in total.
<br>
* Can only contain letters (A-Z or a-z) and numbers (0-9)`
      ),
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
          setNameOfUser(data.data.user.name);

          localStorage.setItem("user token", data.data.token);
          localStorage.setItem("userName", data.data.user.name);

          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        setIsLoading(false);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
            autoComplete="useremail"
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            autoComplete="current-password"
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <div
              className="text-red-700 mt-3 bg-red-100 block p-3 border border-red-700 rounded"
              dangerouslySetInnerHTML={{ __html: formik.errors.password }}
            />
          )}
        </div>
        <div className=" flex justify-between ">
          <Link
            to={"/forgetPassword"}
            className=" text-xl font-bold hover:text-green-600 dark:text-white  dark:hover:text-green-600"
          >
            forget your password ?
          </Link>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  py-2 px-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 border disabled:cursor-not-allowed   disabled:bg-white  disabled:text-green-950 disabled:border-green-950 dark:text-white"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {isLoading ? <div className="loader"></div> : "login now"}
          </button>
        </div>
      </form>
    </>
  );
}
