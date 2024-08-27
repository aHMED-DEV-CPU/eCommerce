import { Helmet } from "react-helmet";
import style from "./AllOrders.module.css";
import axios from "axios";

// import { cartContext } from "../../context/UserContest/CartContext";
import { useEffect, useState } from "react";

export default function AllOrders() {
  // const { userId } = useContext(cartContext);
  const [allInfo, setAllInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  function getAllOrders() {
    let userId = localStorage.getItem("userId");
    console.log(userId);

    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((data) => {
        setAllInfo(data?.data);
        console.log(data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <>
      <Helmet>AllOrders</Helmet>
      <div className="relative shadow-md rounded-lg md:w-2/4 w-5/6 mx-auto p-12 bg-[#f8f9fa] dark:bg-white/70">
        <div className="w-full">
          <div className="   mb-4 ">
            <h2 className="  text-xl md:text-3xl font-bold dark:text-white">
              All Orders
            </h2>
          </div>
          <div>
            {allInfo?.map((order, index) => (
              <div className="  pt-6  border-b mx-3 pb-3" key={order?.id}>
                <div className=" text-2xl text-green-600">
                  <h1 className=" mb-4">order {index + 1}</h1>
                  <h2 className=" mb-4 text-base md:text-xl">
                    {" "}
                    <span className="text-slate-500 "> Total Price :</span>
                    {order?.totalOrderPrice}
                  </h2>
                  <div>
                    {order?.cartItems.map((item) => (
                      <div
                        className=" flex   items-center     "
                        key={item?.product?._id}
                      >
                        <div className=" w-full md:w-1/4 mb-3 ">
                          <img
                            src={item?.product?.imageCover}
                            alt={item?.product?.title}
                          />
                        </div>
                        <div className=" grow text-center text-base md:text-xl">
                          <h3>
                            {" "}
                            <span>Count :</span>
                            {item?.count}
                          </h3>
                          <h4>
                            {" "}
                            <span>Price :</span>
                            {item?.price}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {loading && (
          <div className="      loaderContainer">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </>
  );
}
