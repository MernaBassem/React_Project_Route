import axios from "axios";
import { createContext } from "react";

export let WhishListContent = createContext(); // Corrected typo in variable name

let headers = {
  token: localStorage.getItem('userToken')
};

export function AddToWishList(id) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    productId: id
  }, {
    headers
  }).then((res) => res).catch((error) => error);
}

export function RemoveProductWishList(id) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    headers
  }).then((res) => res).catch((error) => error);
}

export function GetWishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers
    }).then((res) => res).catch((error) => error)
  }

export default function WishListContentProvider(props) {

    
  return (
    <WhishListContent.Provider >
      {props.children}
    </WhishListContent.Provider>
  );
}
