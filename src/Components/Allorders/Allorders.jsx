import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loading from "../Loading/Loading";
import { jwtDecode } from "jwt-decode";

export default function AllOrders() {
  const [allData, setAllData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      setIsLoading(false);
      setIsError(true);
      return;
    }

    const userId = jwtDecode(userToken).id;

    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
        );
        console.log(data);
        setAllData(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      <div className="container mb-5 pb-5 overflow-hidden">
        <h1 className="text-main fw-bold text-center mb-5">All Order</h1>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>Error fetching orders</div>
        ) : (
          <div className="row gy-5">
            {allData ? (
              allData.map((order) => (
                <div
                  key={order._id}
                  className="col-12 order py-4 px-5  cursor-pointer"
                >
                  <div className="mb-5">
                    <div className="row gy-3">
                      <div className="col-md-6">
                        {" "}
                        <h2>
                          <span className="text-main fw-bold ">Name : </span>
                          {order.user.name}
                        </h2>
                      </div>
                      <div className="col-md-6">
                        {" "}
                        <h2>
                          <span className="text-main fw-bold ">Email : </span>
                          {order.user.email}
                        </h2>
                      </div>
                      <div className="col-md-6">
                        {" "}
                        <h2>
                          <span className="text-main fw-bold ">
                            Details Order :{" "}
                          </span>
                          {order.shippingAddress.details}
                        </h2>
                      </div>
                      <div className="col-md-6">
                        {" "}
                        <h2>
                          <span className="text-main fw-bold ">City : </span>
                          {order.shippingAddress.city}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="row gy-5">
                    {order?.cartItems?.map((item, index) => (
                      <div className="col-md-4" key={index}>
                        <div className="product_order py-3 px-2">
                          <img
                            src={item.product.imageCover}
                            className="w-100"
                            alt={item.product.title}
                          />
                          <h5 className="text-center text-main pt-3 pb-2">
                            {item.product.category.name}
                          </h5>
                          <h3 className="h6 text-center pb-3">
                            {item.product.title
                              .split(" ")
                              .slice(0, 2)
                              .join(" ")}
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
                </div>
              ))
            ) : (
              <Loading />
            )}
          </div>
        )}
      </div>
    </>
  );
}
