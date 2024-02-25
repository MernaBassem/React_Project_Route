
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/cartContent";
import {
  AddToWishList,
  RemoveProductWishList,
  GetWishList,
} from "../../Context/whishListContent";

export default function FeatureProduct() {
  const { AddToCart, setNumOfCartItems } = useContext(CartContext);
  const { data, isLoading } = useQuery({
    queryKey: "products",
    queryFn: getProduct,
  });

  const [wishlist, setWishlist] = useState([]);

  async function getwishDetail() {
    try {
      const { data } = await GetWishList();
      if (Array.isArray(data)) {
        setWishlist(data);
      } else {
        console.error("Invalid wishlist data:", data);
      }
    } catch (error) {
      console.error("Error fetching wishlist details:", error);
    }
  }

  async function addCart(id) {
    try {
      const response = await AddToCart(id);
      toast.success("Product Added Successfully");
      setNumOfCartItems(response.data.numOfCartItems);
    } catch (error) {
      toast.error("Product can not be added");
    }
  }

  async function addWhichList(id) {
    try {
      const response = await AddToWishList(id);
      toast.success("Product Added to Favorites");
      setWishlist([...wishlist, id]);
      localStorage.setItem("wishlist", JSON.stringify([...wishlist, id])); 
    } catch (error) {
      toast.error("Product can not be added");
    }
  }

  async function removeWhichList(id) {
    try {
      await RemoveProductWishList(id);
      setWishlist(wishlist.filter((productId) => productId !== id));
      localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist.filter((productId) => productId !== id))
      ); 
      toast.success("Product Removed Successfully");
    } catch (error) {
      toast.error("Product can not be removed");
    }
  }

  function getProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  useEffect(() => {
    getwishDetail();
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (storedWishlist) {
      setWishlist(storedWishlist);
    }
  }, []);

  return (
    <div className="container mb-5 pb-5 overflow-hidden">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row gy-5">
          {data?.data?.data.map((pro) => (
            <div key={pro._id} className="col-md-3 cursor-pointer">
              <div className="product py-3 px-2">
                <Link
                  to={`/detail/${pro._id}`}
                  className="text-decoration-none text-dark"
                >
                  <img src={pro.imageCover} className="w-100" alt={pro.title} />
                  <h5 className="text-center text-main pt-3 pb-2">
                    {pro.category.name}
                  </h5>
                  <h3 className="h6 text-center pb-3">
                    {pro.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between mx-5 align-items-center">
                    <p>{pro.price} EGP</p>
                    <p>
                      <i className="fa-solid fa-star rating-color"></i>
                      {pro.ratingsAverage}
                    </p>
                  </div>
                </Link>
                <div className="d-flex justify-content-end mx-4 my-3">
                  <i
                    className={`fa-solid fa-heart fs-2 heart-icon  ${
                      wishlist.includes(pro._id) ? "text-danger" : ""
                    }`}
                    onClick={() =>
                      wishlist.includes(pro._id)
                        ? removeWhichList(pro._id)
                        : addWhichList(pro._id)
                    }
                  ></i>
                </div>
                <button
                  onClick={() => addCart(pro._id)}
                  className="btn my-2 w-100 bg-main fs-5 py-2 text-light"
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
