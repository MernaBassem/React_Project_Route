import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "./Brands.module.css";

import Loading from "../Loading/Loading";

export default function Brands() {
  const [layerVisible, setLayerVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: "brand",
    queryFn: getAllBrand,
  });

  function getAllBrand() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  function viewDetail(brand) {
    setSelectedBrand(brand);
    setLayerVisible(true);
  }

  function closeLayer() {
    setLayerVisible(false);
    setSelectedBrand(null);
  }

  // Prevents propagation of click event within the inner layer
  function handleInnerLayerClick(e) {
    e.stopPropagation();
  }

  return (
    <>
      <div className="container mb-5 pb-5 overflow-hidden">
        <h1 className="text-main mb-5 fw-bold text-center" style={{ fontSize: "4rem" }}>
          All Brands
        </h1>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="row gy-5">
            {data?.data?.data.map((brand) => (
              <div key={brand._id} className="col-md-4 cursor-pointer">
                <div className="brand" onClick={() => viewDetail(brand)}>
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

      {layerVisible && (
        <div className={`${styles.above_layer}`} onClick={closeLayer}>
          <div className={`${styles.inner_layer}`} onClick={handleInnerLayerClick}>
            <div>
              <div className="d-flex justify-content-end">
                <i class="fa-solid fa-xmark fs-2 cursor-pointer" onClick={closeLayer}></i>
              </div>
              <hr className="my-3" />
              <div className="row">
                <div className="col-6 d-flex flex-column justify-content-center ps-4  align-content-center ">
                <h2 className="text-main fw-bold pb-3" style={{ fontSize: "4rem" }}>{selectedBrand.name}</h2>
                  <p className="fs-3 ">{selectedBrand.slug}</p>
                </div>
                <div className="col-6">
                  <img src={selectedBrand.image} alt="" width={"100%"} />
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-end ">
                <button className="btn bg-main text-white  fs-3" onClick={closeLayer}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
