import React from 'react';
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function FeatureProduct() {
  const { data, isLoading } = useQuery({
    queryKey: "products",
    queryFn: getProduct
  });

  function getProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  return (
    <div className="container mb-5 pb-5 overflow-hidden">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row gy-5">
          {data?.data?.data.map((pro) => (
            <div key={pro._id} className="col-md-3 cursor-pointer">
             
                <div className="product py-3 px-2">
                <Link to={`/detail/${pro._id}`} className="text-decoration-none text-dark">
                  <img src={pro.imageCover} className="w-100" alt={pro.title} />
                  <h5 className="text-center text-main pt-3 pb-2">{pro.category.name}</h5>
                  <h3 className="h6 text-center pb-3">{pro.title.split(" ").slice(0, 2).join(" ")}</h3>
                  <div className="d-flex justify-content-between mx-5 align-items-center">
                    <p>{pro.price} EGP</p>
                    <p>
                      <i className="fa-solid fa-star rating-color"></i>
                      {pro.ratingsAverage}
                    </p>
                  </div>
                  </Link>
                
                  <button className="btn my-2 w-100 bg-main fs-5 py-2 text-light">+ Add</button>
                </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
