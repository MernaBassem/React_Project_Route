import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);

  async function getProduct(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    setProducts(data.data)
  }
  useEffect(()=>{
    getProduct()
  },[])
  return <>
    <div className="container mb-5 pb-5 overflow-hidden ">
      <div className="row gy-3">
      {products.map((pro) => (
                        <div key={pro._id} className='col-md-3'>
                            <img src={pro.imageCover} width={'100%'} height={'200px'} alt={pro.title} />
                            <h4 className="text-center">{pro.title.split(" ").slice(0,2).join(" ")}</h4>
                            <h6 className="text-center">{pro.category.name}</h6>
                            <div className='d-flex justify-content-between mx-5 align-items-center '>
                   <p>
                              {pro.price} EGP
                              </p>
                              <p>
                              <i className="fa-solid fa-star text-warning "></i>
                              {pro.ratingsAverage}
                              </p>
                            </div>
                        </div>
                    ))}
      </div>
    </div>
  </>
}
