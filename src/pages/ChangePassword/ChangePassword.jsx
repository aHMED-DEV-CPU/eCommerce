import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ChangePassword() {
  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    newPassword: Yup.string()
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
  function handleNewPassword(formValues) {
    setIsLoading(true);
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email: formValues.email,
        newPassword: formValues.newPassword,
      })
      .then((data) => {
        console.log(data);
        if (data?.statusText === "OK") {
          setIsLoading(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);

        setIsLoading(false);
        setError(error.response.data.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleNewPassword,
  });
  return (
    <>
      <Helmet>
        <title>change your password</title>
      </Helmet>
      {/* {error && <h2 className=" text-red-700">{error}</h2>} */}
      <form
        className=" tablet:w-3/4 w-full mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <h2 className=" text-green-600 text-2xl mb-4">change your password</h2>
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
            name="newPassword"
            value={formik.values.newPassword}
            id="floating_newPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-900 focus:outline-none focus:ring-0 focus:border-green-900 peer"
            placeholder=" "
            autoComplete="current-newPassword"
            required
          />
          <label
            htmlFor="floating_newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-900 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            newPassword
          </label>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div
              className="text-red-700 mt-3 bg-red-100 block p-3 border border-red-700 rounded"
              dangerouslySetInnerHTML={{ __html: formik.errors.newPassword }}
            />
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 border disabled:cursor-not-allowed   disabled:bg-white  disabled:text-green-950 disabled:border-green-950 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          disabled={!(formik.isValid && formik.dirty)}
        >
          {isLoading ? <div className="loader"></div> : "change"}
        </button>
      </form>
      {error && (
        <div className="text-red-700 mt-3 bg-red-100 block p-3 border border-red-700 rounded">
          {error}
        </div>
      )}
    </>
  );
}
