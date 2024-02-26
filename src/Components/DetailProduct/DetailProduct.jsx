import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/cartContent";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import {
  AddToWishList,
  RemoveProductWishList,
  GetWishList,
} from "../../Context/whishListContent";

export default function DetailProduct() {
  let { AddToCart, setNumOfCartItems } = useContext(CartContext);

  async function addCart(id) {
    let response = await AddToCart(id);
    if (response.data.status == "success") {
      toast.success("Product Added Successfully");
      setNumOfCartItems(response.data.numOfCartItems);
    } else {
      toast.error("Product can not added");
    }
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true,
  };
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["detailProduct", id],
    queryFn: getDetailProduct,
  });

  function getDetailProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const detailPro = data?.data?.data;
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


  useEffect(() => {
    getwishDetail();
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (storedWishlist) {
      setWishlist(storedWishlist);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Details</title>
      </Helmet>
      <div className="container mb-5 pb-5 overflow-hidden">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="row gy-5" key={detailPro._id}>
            <div className="col-md-4 cursor-pointer">
              <div className=" py-3 px-2 my-4">
                <Slider {...settings} className="w-100">
                  {detailPro.images.map((ele) => (
                    <img src={ele} className="w-100" alt={detailPro.title} />
                  ))}
                </Slider>
              </div>
            </div>

            <div className="col-md-7 offset-1   py-3 px-2 my-4 d-flex justify-content-start  align-items-center ">
              <div className="w-100">
                <h3 className=" pb-3">{detailPro.title}</h3>
                <p>{detailPro.description}</p>
                <h5 className="text-main pt-3 pb-2">
                  {detailPro.category.name}
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                  <p>{detailPro.price} EGP</p>
                  <p>
                    <i className="fa-solid fa-star rating-color"></i>
                    {detailPro.ratingsAverage}
                  </p>
                </div>
                <div className="d-flex justify-content-end mx-4 my-3">
                  <i
                    className={`fa-solid fa-heart fs-2 heart-icon  cursor-pointer ${
                      wishlist.includes(detailPro._id) ? "text-danger" : ""
                    }`}
                    onClick={() =>
                      wishlist.includes(detailPro._id)
                        ? removeWhichList(detailPro._id)
                        : addWhichList(detailPro._id)
                    }
                  ></i>
                </div>
                <button
                  onClick={() => addCart(detailPro._id)}
                  className="btn my-2 w-100 bg-main fs-5 py-2 text-light"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}




























