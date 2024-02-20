

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");
  let [isLodding, setIsLodding] = useState(false);

  async function callLogin(reqBody) {
    setIsLodding(true);
    try {
      setErrorMsg("");
      let { data } = await axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, reqBody)
        .catch((err) => {
          setIsLodding(false);
          setErrorMsg(err.response.data.message);
        });

      if (data.message === "success") {
        navigate("../");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  const validationSchema = Yup.object({
   
    email: Yup.string().email("Email Not Valid").required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^[A-Z][a-z0-9]{3,8}$/,
        "invalid password, should be ex. Dnd345m and max length 8"
      )
      .required("Password is Required"),
    
  });

  const loginForm = useFormik({
    initialValues: {
   
      email: "",
      password: "",
     
    },
    validationSchema,
    onSubmit: callLogin,
  });

  return (
    <div className="w-50 mx-auto my-5">
      <h2 className="mb-3">Login Now</h2>
      {errorMsg ? (
        <div className="alert alert-danger mt-3">{errorMsg}</div>
      ) : null}
      <form onSubmit={loginForm.handleSubmit}>
  
        <div className="form-group my-3">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-100"
            id="email"
            value={loginForm.values.email}
            name="email"
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            disabled={isLodding}
          />
          {loginForm.errors.email && loginForm.touched.email ? (
            <div className="alert alert-danger mt-3">
              {loginForm.errors.email}
            </div>
          ) : null}
        </div>
        <div className="form-group my-3">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-100"
            id="password"
            value={loginForm.values.password}
            name="password"
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            disabled={isLodding}
          />
          {loginForm.errors.password && loginForm.touched.password ? (
            <div className="alert alert-danger mt-3">
              {loginForm.errors.password}
            </div>
          ) : null}
        </div>
    
       
        <div className="d-flex justify-content-end my-3">
          <button
            type="submit"
            className="btn text-light btn-success"
            disabled={isLodding}
          >
            {isLodding ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
