import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext()
let headers = {

    token : localStorage.getItem('userToken')
  
}
localStorage.getItem('userToken')
function AddToCart (id){
 return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
    productId:id
  },{
    headers
  }).then((res)=>res).catch((error)=>error)
}
function GetCart (){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
     headers
   }).then((res)=>res).catch((error)=>error)
 }



export default function CartContentProvider(props){
    return(
        <>
        <CartContext.Provider value={{AddToCart,GetCart}}>
          {props.children}
        </CartContext.Provider>
        </>
    )
}

