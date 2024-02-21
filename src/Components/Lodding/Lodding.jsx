import React, { useEffect, useState } from "react";
import styles from "./Lodding.module.css";

import { TailSpin } from "react-loader-spinner";

export default function Lodding() {




  return (
    <>
    <div className={`${styles.lodding} d-flex justify-content-center align-items-center`}>
    <TailSpin 
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
 
    </div>

  
    </>
  );
}
