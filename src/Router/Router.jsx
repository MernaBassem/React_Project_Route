import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home/Home";
import Products from "../Components/Products/Products";
import Cart from "../Components/Cart/Cart";
import Brands from "../Components/Brands/Brands";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Categories from "../Components/Categories/Categories";
import Layout from "../Components/Layout/Layout";
import NotFound from "../Components/NotFound/NotFound";
import ProtectedRoutes from "../Components/ProtectedRoutes/ProtectedRoutes";
import DetailProduct from "../Components/DetailProduct/DetailProduct";
import Checkout from "../Components/Checkout/Checkout";
import Allorders from "../Components/Allorders/Allorders";
import SubCategory from "../Components/SubCategory/SubCategory";
import WishList from "../Components/WishList/WishList";
import ForgotPassword from "../Components/ForgetPassword/ForgetPassword";
import ResetCode from "../Components/ResetCode/ResetCode";
import ResetPassword from "../Components/ResetPassword/ResetPassword";

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Products"
          element={
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />
         <Route
          path="/Checkout"
          element={
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Brands"
          element={
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <ProtectedRoutes>
              <DetailProduct />
            </ProtectedRoutes>
          }
        />
             <Route
          path="/allorders"
          element={
            <ProtectedRoutes>
              <Allorders />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Categories"
          element={
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          }
        />
        
        <Route
          path="/category/:id/:name"
          element={
            <ProtectedRoutes>
              <SubCategory />
            </ProtectedRoutes>
          }
        />
           <Route
          path="/wishList"
          element={
            <ProtectedRoutes>
            <WishList />
            </ProtectedRoutes>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgotPassword />} />
        <Route path="/resetCode" element={<ResetCode/>} />
        <Route path="/resetPassword" element={<ResetPassword/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
