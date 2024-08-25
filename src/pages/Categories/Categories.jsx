import { useQuery } from "@tanstack/react-query";
import style from "./Categories.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
  const [catName, setCatName] = useState("");
  const [subCat, setSubCat] = useState([]);
  const [loadingSubCats, setLoadingSubCats] = useState(false);

  async function handleAllCategories() {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return response.data.data;
  }
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: handleAllCategories,
  });

  async function handleSubCategories(categoryId) {
    setLoadingSubCats(true);
    setSubCat([]);
    setCatName("");

    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );
      setSubCat(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoadingSubCats(false);
    }
  }

  return (
    <>
      {isCategoriesLoading ? (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap w-11/12 mx-auto mb-9 md:justify-normal justify-center">
            {categories?.map((category) => (
              <div className="sm:w-1/2 lg:w-1/3 p-5" key={category._id}>
                <button
                  onClick={() => {
                    handleSubCategories(category._id);
                    setCatName(category?.name);
                  }}
                  className={`border rounded ${style.boxShadow} duration-300 w-full`}
                >
                  <div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-[300px] object-cover object-center w-full"
                    />
                  </div>
                  <h5 className="text-center p-4 mb-4 text-green-600 text-2xl">
                    {category.name}
                  </h5>
                </button>
              </div>
            ))}
          </div>
          {loadingSubCats ? (
            <div className="loaderContainer">
              <div className="loader"></div>
            </div>
          ) : (
            subCat.length > 0 && (
              <div className="my-7">
                <h6 className="text-4xl text-green-600 text-center mb-5">
                  {catName} subcategories
                </h6>
                <div className="flex flex-wrap">
                  {subCat.map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className="w-full sm:w-1/2 lg:w-1/3 p-4"
                    >
                      <div
                        className={`border p-4 text-2xl text-center font-bold rounded ${style.boxShadow} duration-300`}
                      >
                        {subCategory.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </>
      )}
      <Helmet>
        <title>Categories</title>
      </Helmet>
    </>
  );
}
