import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className="bg-main-light fixed-bottom  p-5">
        <div>
          <h2 className="fw-bold py-2 ">
            Get the FreshCart app
           
          </h2>
          <p className="fs-5 py-2 ">
            We will send you a link , open it on your phoneto download the app
          </p>

          <div className="row gy-3">
            <div className="col-md-9">
              <input
                type="email"
                placeholder="Email"
                className="py-2 w-100 rounded  px-4"
              />
            </div>
            <div className="col-md-3">
              <button className="btn bg-main py-2 fs-5 text-light px-3  ">
                Share App Link
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
