import React from "react";
import styles from "./Home.module.css";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import {Helmet} from "react-helmet";
import FeatureProduct from "../FeatureProduct/FeatureProduct";
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
      <FeatureProduct/>
     
    </>
  );
}
