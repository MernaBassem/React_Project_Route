import React from 'react';
import styles from './Categories.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from 'react-router-dom'; 
import { Helmet } from 'react-helmet';

export default function Categories() {
  const { data, isLoading } = useQuery({
    queryKey: "category",
    queryFn: getCategory
  });
  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  return <>
  <Helmet >
    <title>
      Categories
    </title>
  </Helmet>
        <div className="container mb-5 pb-5 overflow-hidden">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row gy-5">
          {data?.data?.data.map((category) => (
            <div key={category._id} className="col-md-4 cursor-pointer">    
                <div className="category">
                <Link to={`/category/${category._id}/${category.name}`} className="text-decoration-none text-dark">
                  <img src={category.image} className="w-100" style={{ height: "400px" }} alt={category.name} />
                  <h2 className="text-center text-main fw-bold  py-4">{category.name}</h2>
                  </Link>
                
                </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  </>
}
