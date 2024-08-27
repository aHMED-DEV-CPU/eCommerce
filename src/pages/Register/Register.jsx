import axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function Register() {
  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "at least 3 chars")
      .max(12, "not more than  12 chars")
      .required(),
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
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "not valid"),
    phone: Yup.string()
      .required()
      .matches(/^01[0-25][0-9]{8}$/, "is not valid"),
  });
  let [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handleRegister(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then((data) => {
        if (data.data.message === "success") {
          setIsLoading(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        setIsLoading(false);
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
    onSubmit: handleRegister,
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      {error && <h2 className=" text-red-700">{error}</h2>}
      <form
        className=" tablet:w-3/4 w-full mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <h2 className=" text-green-600 text-2xl mb-4">Register Now</h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="name"
            name="name"
            value={formik.values.name}
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600  dark:text-white dark:border-gray-600 dark:focus:border-green-900 focus:outline-none focus:ring-0 focus:border-green-900 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            name address
          </label>
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-700 mt-3 bg-red-100 block p-3 border border-red-700 rounded">
              {formik.errors.name}
            </div>
          )}
        </div>
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-700 mt-3 bg-red-100 block p-3 border border-red-700 rounded">
              {formik.errors.email}
            </div>
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-900 focus:outline-none focus:ring-0 focus:border-green-900 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="text-red-700 mt-3 bg-red-100 block p-3 border border-red-700 rounded">
              {formik.errors.rePassword}
            </div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-900 focus:outline-none focus:ring-0 focus:border-green-900 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            phone
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-red-700 mt-3 bg-red-100 block p-3 border border-red-700 rounded">
              {formik.errors.phone}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 border disabled:cursor-not-allowed   disabled:bg-white  disabled:text-green-950 disabled:border-green-950 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          disabled={!(formik.isValid && formik.dirty)}
        >
          {isLoading ? <div className="loader"></div> : "submit"}
        </button>
      </form>
    </>
  );
}
