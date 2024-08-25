import { Helmet } from "react-helmet";
import style from "./Checkout.module.css";
import axios from "axios";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { cartContext } from "../../context/UserContest/CartContext";
export default function Checkout() {
  let navigate = useNavigate();
  let { onlinePayment } = useContext(cartContext);
  let validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(3, "at least 3 chars")
      .max(12, "not more than  12 chars")
      .required(),
    phone: Yup.string()
      .required()
      .matches(/^01[0-25][0-9]{8}$/, "is not valid"),
    city: Yup.string()
      .min(3, "at least 3 chars")
      .max(12, "not more than  12 chars")
      .required(),
  });
  let [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handlePayment(formValues) {
    console.log(formValues);

    const { data } = await onlinePayment(formValues);
    console.log(data?.session?.url);
    window.location.href = data?.session?.url;
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handlePayment,
  });

  return (
    <>
      <Helmet>
        <title>checkout</title>
      </Helmet>
      {error && <h2 className=" text-red-700">{error}</h2>}
      <form
        className=" tablet:w-3/4 w-full mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <h2 className=" text-green-600 text-2xl mb-4">CheckOut</h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="details"
            name="details"
            value={formik.values.details}
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-900 focus:outline-none focus:ring-0 focus:border-green-900 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-900 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Details
          </label>
          {formik.errors.details && formik.touched.details && (
            <div className="text-red-700 mt-3 bg-red-100 block p-3 border border-red-700 rounded">
              {formik.errors.details}
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-900 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            phone
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-red-700 mt-3 bg-red-100 block p-3 border border-red-700 rounded">
              {formik.errors.phone}
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="city"
            name="city"
            value={formik.values.city}
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-900 focus:outline-none focus:ring-0 focus:border-green-900 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-900 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            city
          </label>
          {formik.errors.city && formik.touched.city && (
            <div className="text-red-700 mt-3 bg-red-100 block p-3 border border-red-700 rounded">
              {formik.errors.city}
            </div>
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
