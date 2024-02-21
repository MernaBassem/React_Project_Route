import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import axios from "axios";
import Lodding from "../Lodding/Lodding";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLodding, setisLodding] = useState(true);

  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(data.data);
    setisLodding(false)
  }
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <div className="container mb-5 pb-5 overflow-hidden ">
        {isLodding? <Lodding />
      :      <div className="row gy-5">
      {products.map((pro) => (
        <div key={pro._id} className="col-md-3  cursor-pointer">
          <div className="product py-3 px-2 ">
            <img
              src={pro.imageCover}
              className="w-100"
              // height={"200px"}
              alt={pro.title}
            />
            <h5 className="text-center text-main pt-3 pb-2">
              {pro.category.name}
            </h5>
            <h6 className="text-center pb-3">
              {pro.title.split(" ").slice(0, 2).join(" ")}
            </h6>

            <div className="d-flex justify-content-between mx-5 align-items-center ">
              <p>{pro.price} EGP</p>
              <p>
                <i className="fa-solid fa-star rating-color "></i>
                {pro.ratingsAverage}
              </p>
            </div>
            <button className="btn my-2 w-100 bg-main fs-5 py-2 text-light ">
              + Add
            </button>
          </div>
        </div>
      ))}
    </div>
      }
    
      </div>
    </>
  );
}
