import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/cartContent";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import img1 from "../../assets/images/blog-img-1.jpeg";

export default function Cart() {
  let { GetCart ,RemoveProductFromCart} = useContext(CartContext);
  const [cartDetail, setCartDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function removeItem(id){
  let {data} =  await RemoveProductFromCart(id)
  setCartDetail(data);
  }


  async function getCartDetails() {
    try {
      let { data } = await GetCart();
      setCartDetail(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cart details:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-5 pb-5 overflow-hidden">
          <div className="mx-auto bg-main-light py-3 px-4">
            <h1 className="fw-bold">Cart Shop</h1>
            <div className="d-flex justify-content-between my-3">
              <h3 className="h5 fw-bold">
                Total Price :{" "}
                <span className="text-main">
                  {cartDetail.data.totalCartPrice} EGP
                </span>
              </h3>

              <h3 className="h5 fw-bold">
                Total Numbers of Cart Item :{" "}
                <span className="text-main">
                  {cartDetail.numOfCartItems}
                </span>
              </h3>
            </div>
            {cartDetail.data.products.map((pro) => (
              <div className="row px-2 border-bottom py-3" key={pro._id}>
                <div className="col-md-1">
                  <img
                    src={pro.product.imageCover}
                    alt="image"
                    className="w-100"
                  />
                </div>
                <div className="col-md-11">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="fw-bold">{pro.product.title}</h3>
                      <h5 className="text-main fw-bold">{pro.price} EGP</h5>
                      <button onClick={()=>removeItem(pro.product._id) } className="text-danger bg-transparent border-0  fw-bold">
                        <i className="fa-solid fa-trash-can me-2"></i>
                        Remove
                      </button>
                    </div>
                    <div>
                      <button className="cart_button fs-3 px-3 mx-3">-</button>
                      <span className="fs-3">{pro.count} </span>
                      <button className="cart_button fs-3 px-3 mx-3">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
