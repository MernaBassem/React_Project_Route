import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()
let headers = {

  token: localStorage.getItem('userToken')

}
localStorage.getItem('userToken')
function AddToCart(id) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
    productId: id
  }, {
    headers
  }).then((res) => res).catch((error) => error)
}
function GetCart() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers
  }).then((res) => res).catch((error) => error)
}

function RemoveProductFromCart(id) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    headers
  }).then((res) => res).catch((error) => error)
}


function UpdateProductFromCart(id, count) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {

    count
  }, {
    headers
  }).then((res) => res).catch((error) => error)
}




export default function CartContentProvider(props) {
  const[cardId,setCartId]=useState(null)
  const[numOfCartItems,setNumOfCartItems]=useState(null)
  async function getInitialCart(){
    let {data} =await GetCart();
    setCartId(data?.data._id)
    setNumOfCartItems(data?.numOfCartItems)
  }
 

  function onlinePayment(shippingAddress) { 
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:3000`,
      {
  
        shippingAddress: shippingAddress,
      },
      {
        headers
      }
    )
      .then((res) => res)
      .catch((err) => err);
  }
  
  useEffect(()=>{
    getInitialCart();
  },[])
  return (
    <>
      <CartContext.Provider value={{ AddToCart, GetCart, RemoveProductFromCart, UpdateProductFromCart,onlinePayment ,numOfCartItems,setNumOfCartItems}}>
        {props.children}
      </CartContext.Provider>
    </>
  )
}

