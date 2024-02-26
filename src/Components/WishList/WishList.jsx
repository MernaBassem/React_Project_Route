// import React, { useContext, useEffect, useState } from "react";
// import { CartContext } from "../../Context/cartContent";
// import Loading from "../Loading/Loading";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import { RemoveProductWishList, GetWishList, WhishListContent } from "../../Context/whishListContent";

// export default function WishList() {
//   let { AddToCart, setNumOfCartItems } = useContext(CartContext);
//   const [wishDetail, setwishDetail] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
  
//   async function addCart(id) {
//     let response = await AddToCart(id);
//     if (response.data.status === "success") {
//       toast.success("Product Added Successfully");
//       setNumOfCartItems(response.data.numOfCartItems);
//       getwishDetail()
//     } else {
//       toast.error("Product can not be added");
//     }
//   }

//   async function getwishDetail() {
//     try {
//       let { data } = await GetWishList();
//       setwishDetail(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching cart details:", error);
//       setIsLoading(false);
//     }
//   }

//   async function removeWhichList(id) {
//     let { data } = await RemoveProductWishList(id);
//     toast.success("Product Removed Successfully");
//     getwishDetail()
//   }

//   useEffect(() => {
//     getwishDetail();
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title>Cart</title>
//       </Helmet>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         wishDetail?.data? (
//           <>
//             <div className="container my-5 pb-5 overflow-hidden">
//               <div className="mx-auto bg-main-light py-3 px-4">
//                 <h1 className="fw-bold">WishList</h1>
              
//                 {wishDetail.data.map((pro) => (
//                   <div className="row px-2 border-bottom py-3" key={pro._id}>
//                     <div className="col-md-1">
//                       <img src={pro.imageCover} alt="image" className="w-100" />
//                     </div>
//                     <div className="col-md-11">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                           <h3 className="fw-bold">{pro.title}</h3>
//                           <h5 className="text-main fw-bold">{pro.price} EGP</h5>
//                           <button
//                             onClick={() => removeWhichList(pro._id)}
//                             className="text-danger bg-transparent border-0  fw-bold"
//                           >
//                             <i className="fa-solid fa-trash-can me-2"></i>
//                             Remove
//                           </button>
//                         </div>
//                         <div>
//                           <button
//                             className="btn bg-main text-white my-3 fs-3 text-center"
//                             onClick={async () => {
//                               await RemoveProductWishList(pro._id);
//                               addCart(pro._id);
//                             }}
//                           >
//                             Add To Cart
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="container">
//             <div className="bg-main-light mx-auto w-50 text-white p-5 my-5 text-center">
//               <h2 className="text-main fs-1 fw-bold"> Wish List is Empty</h2>
//             </div>
//           </div>
//         )
//       )}
//     </>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/cartContent";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { RemoveProductWishList, GetWishList, WhishListContent } from "../../Context/whishListContent";

export default function WishList() {
  const { AddToCart, setNumOfCartItems } = useContext(CartContext);
  const [wishDetail, setwishDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
    getwishDetail();
  }, []);

  async function addCart(id) {
    try {
      const response = await AddToCart(id);
      if (response.data.status === "success") {
        toast.success("Product Added Successfully");
        setNumOfCartItems(response.data.numOfCartItems);
        const updatedWishlist = wishlist.filter(productId => productId !== id);
        setWishlist(updatedWishlist);
        // removeWhichList(id)
        RemoveProductWishList(id)
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        getwishDetail();
      } else {
        toast.error("Product can not be added");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Product can not be added");
    }
  }

  async function getwishDetail() {
    try {
      const { data } = await GetWishList();
      setwishDetail(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist details:", error);
      setIsLoading(false);
    }
  }

  async function removeWhichList(id) {
    try {
      await RemoveProductWishList(id);
      const updatedWishlist = wishlist.filter(productId => productId !== id);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.success("Product Removed Successfully");
      getwishDetail();
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast.error("Product can not be removed");
    }
  }

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-5 pb-5 overflow-hidden">
          <div className="mx-auto bg-main-light py-3 px-4">
      
            {wishDetail?.data && wishDetail.data.length > 0 ? (
              <>
             
                    <h1 className="fw-bold">Wishlist</h1>
             { wishDetail.data.map((pro) => (
                <div className="row px-2 border-bottom py-3" key={pro._id}>
                  <div className="col-md-1">
                    <img src={pro.imageCover} alt="image" className="w-100" />
                  </div>
                  <div className="col-md-11">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="fw-bold">{pro.title.split(" ").slice(0, 3).join(" ")}</h3>
                        <h5 className="text-main fw-bold">{pro.price} EGP</h5>
                        <button
                          onClick={() => removeWhichList(pro._id)}
                          className="text-danger bg-transparent border-0  fw-bold"
                        >
                          <i className="fa-solid fa-trash-can me-2"></i>
                          Remove
                        </button>
                      </div>
                      <div>
                        <button
                          className="btn bg-main text-white my-3 fs-3 text-center"
                          onClick={() => addCart(pro._id)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </>
            ) : (
              <div className="bg-main-light mx-auto  text-white p-5 my-5 text-center">
                <h2 className="text-main fs-1 fw-bold">Wishlist is Empty</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
