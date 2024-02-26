import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/cartContent";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import img1 from "../../assets/images/blog-img-1.jpeg";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let {
    GetCart,
    RemoveAllCart,
    RemoveProductFromCart,
    UpdateProductFromCart,
    setNumOfCartItems,
    numOfCartItems,
  } = useContext(CartContext);
  const [cartDetail, setCartDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function removeItem(id) {
    let { data } = await RemoveProductFromCart(id);
    setCartDetail(data);
    setNumOfCartItems(data?.numOfCartItems);
    toast.success("Product Removed Successfully");
  }
  async function updateItem(id, count) {
    let { data } = await UpdateProductFromCart(id, count);
    if (count == 0) {
      removeItem(id);
    }
    setCartDetail(data);
  }

  async function removeAllCart() {
    let { data } = await RemoveAllCart();
    setCartDetail(data);
    setNumOfCartItems(data?.numOfCartItems);
    toast.success(" Removed All Product Successfully");
  }

  async function getCartDetails() {
    try {
      let { data } = await GetCart();
      setCartDetail(data);
      setNumOfCartItems(data?.numOfCartItems);
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
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : cartDetail?.data && numOfCartItems != 0 ? (
        <>
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
                  <span className="text-main">{cartDetail.numOfCartItems}</span>
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
                        <button
                          onClick={() => removeItem(pro.product._id)}
                          className="text-danger bg-transparent border-0  fw-bold"
                        >
                          <i className="fa-solid fa-trash-can me-2"></i>
                          Remove
                        </button>
                      </div>
                      <div>
                        <button
                          className="cart_button fs-3 px-3 mx-3"
                          onClick={() =>
                            updateItem(pro.product._id, pro.count - 1)
                          }
                        >
                          -
                        </button>
                        <span className="fs-3">{pro.count} </span>
                        <button
                          className="cart_button fs-3 px-3 mx-3"
                          onClick={() =>
                            updateItem(pro.product._id, pro.count + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Link
                className="btn bg-main w-100 text-white  my-3 fs-3 text-center"
                to={"/checkout"}
              >
                Checkout
              </Link>
              <div>
    
                <button
                  className="cart_button fs-3 px-3 w-100"
                  onClick={() => removeAllCart()}
                >
                  Remove All From Cart
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="bg-main-light  mx-auto w-50 text-white p-5 my-5 text-center">
            <h2 className="text-main fs-1  fw-bold"> Cart is Empty</h2>
          </div>
        </div>
      )}
    </>
  );
}
