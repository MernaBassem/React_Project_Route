import React from "react";
import styles from "./Home.module.css";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import {Helmet} from "react-helmet";
import Products from "../Products/Products";
export default function Home() {
  return (
    <>
       <div className="application">
            <Helmet>
               
                <title>Home</title>
            </Helmet>
            </div>
      <MainSlider />
      <CategorySlider />
      <Products/>
     
    </>
  );
}
