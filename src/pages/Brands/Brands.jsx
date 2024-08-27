import axios from "axios";
import style from "./Brands.module.css";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

("use client");

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function Brands() {
  async function getAllBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const [openModal, setOpenModal] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandSlug, setBrandSlug] = useState("");
  const [brandImage, setBrandImage] = useState("");
  let { data, error, isLoading } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
  });

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h2 className=" text-green-600 text-center text-4xl font-bold justify-center mb-6 pt-5">
        All Brands
      </h2>
      {isLoading ? (
        <div className="      loaderContainer">
          <div className="loader"></div>
        </div>
      ) : (
        <div className=" flex flex-wrap  w-11/12 mx-auto  mb-9 justify-center md:justify-normal">
          {data?.data?.data?.map((brand) => {
            return (
              <>
                <div className=" md:w-1/2 lg:w-1/4 p-5" key={brand._id}>
                  <button
                    onClick={() => {
                      setBrandName(brand?.name);
                      setBrandSlug(brand?.slug);
                      setBrandImage(brand?.image);
                      setOpenModal(true);
                    }}
                    className={`border rounded ${style.boxShadow}  duration-300`}
                  >
                    <div>
                      {" "}
                      <img src={brand.image} alt="" />
                    </div>
                    <h5 className=" text-center p-4 mb-4 dark:text-white">
                      {brand.name}
                    </h5>
                  </button>
                </div>
              </>
            );
          })}
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
          >
            <Modal.Header></Modal.Header>
            <Modal.Body>
              <div className=" flex flex-wrap">
                <div className=" md:w-1/2">
                  <h1 className=" text-4xl text-green-500 mb-3">
                    {" "}
                    {brandName}
                  </h1>
                  <p className=" text-2xl">{brandSlug}</p>
                </div>
                <div className=" md:w-1/2">
                  {" "}
                  <img src={brandImage} alt="" />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className=" ms-auto  ">
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Close
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}
