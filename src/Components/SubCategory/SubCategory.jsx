import React from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function SubCategory() {
  const { id, name } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["SubCategory", id],
    queryFn: getSubCategory,
  });

  function getSubCategory() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }

  return (
    <div className="container mb-5 pb-5 overflow-hidden">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row gy-5">
          <h1 className="text-main text-center fw-bold ">{name} subcategories</h1>
          {data?.data?.data.map((subCategory) => (
            <div key={subCategory._id} className="col-md-12 cursor-pointer">
              <div className="category">
                <h2 className="text-center text-main fw-bold py-4">
                  {subCategory.name}
                </h2>
              </div>
            </div>
          ))}
          {data?.data?.data.length === 0 &&    <div className="container">
            <div className="bg-main-light  mx-auto w-50 text-white p-5 my-5 text-center">
              <h2 className="text-main fs-1  fw-bold">Not SubCategories</h2>
            </div>
          </div>
}
        </div>
      )}
    </div>
  );
}
