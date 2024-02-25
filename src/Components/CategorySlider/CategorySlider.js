import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 8,
        autoplay:true,
        responsive: [
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 7
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 6
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 5
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      };

    const { data, isLoading } = useQuery({
        queryKey: "category",
        queryFn: getCategory
      });
    
      function getCategory() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      }
   


    return (
        <>
        {isLoading? <Loading />:

          <div className="container mb-5 pb-5 overflow-hidden ">
          <h2 className="my-3">
              Shop Popular Category
          </h2>
          <Slider {...settings} className="w-100">
              {data?.data?.data.map((category) => (
                  <div key={category._id}>
                      <img src={category.image} width={'100%'} height={'200px'} alt={category.name} />
                      <span className="text-center">{category.name}</span>
                  </div>
              ))}
          </Slider>
      </div>
  
        }
          
        </>
    );
}
