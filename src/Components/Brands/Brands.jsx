import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
export default function Brands() {
  const { data, isLoading } = useQuery({
    queryKey: "brand",
    queryFn: getAllBrand,
  });
  function getAllBrand() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  return (
    <>
      <div className="container mb-5 pb-5 overflow-hidden">
        <h1
          className="text-main my-5 fw-bold text-center"
          style={{ fontSize: "4rem" }}
        >
          All Brands
        </h1>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="row gy-5">
            {data?.data?.data.map((brand) => (
              <div key={brand._id} className="col-md-4 cursor-pointer">
                <div className="brand">
                  <img
                    src={brand.image}
                    className="w-100"
                    style={{ height: "300px" }}
                    alt={brand.name}
                  />
                  <div className="text-center  fw-bold  py-4">
                    <p className="fs-3">{brand.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
