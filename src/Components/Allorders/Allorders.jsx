import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { jwtDecode } from "jwt-decode";

export default function Allorders() {
  // const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   const getToken = () => {
  //     return localStorage.getItem("userToken");
  //   };

  //   const token = getToken();

  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     const { id } = decodedToken;
  //     setUserId(id);
  //   }
  // }, []);

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: "order",
  //   queryFn: () => getOrders(userId),
  // });

  // async function getOrders(userId) {
  //   try {
  //     const response = await axios.get(
  //       `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw new Error("Failed to fetch orders");
  //   }
  // }

  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      {/* <div className="container mb-5 pb-5 overflow-hidden">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>Error fetching orders</div>
        ) : (
          <div className="row gy-5">
  {data && data.cartItems && data.cartItems.map((item) => (
    <div key={item._id} className="col-md-3 cursor-pointer">
      <div className="product py-3 px-2">
        <img
          src={item.product.imageCover}
          className="w-100"
          alt={item.product.title}
        />
        <h5 className="text-center text-main pt-3 pb-2">
          {item.product.category.name}
        </h5>
        <h3 className="h6 text-center pb-3">
          {item.product.title.split(" ").slice(0, 2).join(" ")}
        </h3>
        <div className="d-flex justify-content-between mx-5 align-items-center">
          <p>{item.price} EGP</p>
          <p>
            <i className="fa-solid fa-star rating-color"></i>{" "}
            {item.product.ratingsAverage}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

        )}
      </div> */}

<div className="container">

<div className="bg-success p-5  my-5 text-center">
  <h2 className="text-white "> CONGRAATSS</h2>
</div>
</div>
    </>
  );
}
