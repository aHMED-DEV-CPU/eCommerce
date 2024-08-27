import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function Verify() {
  let [inputValue, setInputValue] = useState("");
  let [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  function handleChange(event) {
    const newVal = event.target.value;
    setInputValue(newVal);
    console.log(inputValue);
  }
  function handleVerify() {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: inputValue,
      })
      .then((data) => {
        console.log(data);
        if (data?.data?.status === "Success") {
          setIsLoading(false);
          navigate("/change-password");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.message);
      });
  }
  return (
    <>
      <Helmet>
        <title>verify</title>
      </Helmet>
      <div className="  pt-5">
        <label
          htmlFor="first_name"
          className="block mb-2  font-medium text-green-500 dark:text-white text-2xl"
        >
          verification code
        </label>
        <input
          type="email"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder="Email"
          value={inputValue}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="focus:outline-none border disabled:cursor-not-allowed   disabled:bg-white  disabled:text-green-950 disabled:border-green-950 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-5"
          onClick={() => handleVerify()}
          disabled={inputValue.length === 0}
        >
          {isLoading ? <div className="loader"></div> : "verify"}
        </button>
      </div>
      {error && (
        <div className="text-red-700 mt-3 bg-red-100 block p-3 border border-red-700 rounded">
          {error}
        </div>
      )}
    </>
  );
}
