import React, { useState } from "react";
// import styles from './Register.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Register() {
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");
  let [isLodding, setIsLodding] = useState(false);

  async function callRegister(reqBody) {
    setIsLodding(true);
    try {
      setErrorMsg("");
      let { data } = await axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, reqBody)
        .catch((err) => {
          setIsLodding(false);
          setErrorMsg(err.response.data.message);
        });

      if (data.message === "success") {
        navigate("../login");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name Is Too Short")
      .max(20, "Name Is Too Long")
      .required("Name is Required"),
    email: Yup.string().email("Email Not Valid").required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^[a-zA-Z0-9]{6,30}$/,
        "invalid password, should be ex. aDnd345m and max length 30"
      )
      .required("Password is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "RePassword does not match Password")
      .required("RePassword is Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone")
      .required("Phone is Required"),
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: callRegister,
  });

  return (
    <>
    <Helmet>
      <title>
        Register
      </title>
    </Helmet>
       <div className="w-50 mx-auto my-5">
      <h2 className="mb-3">Register Now</h2>
      {errorMsg ? (
        <div className="alert alert-danger mt-3">{errorMsg}</div>
      ) : null}
      <form onSubmit={registerForm.handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="fullName" className="mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-100 py-2 px-3"
            id="fullName"
            value={registerForm.values.name}
            name="name"
            placeholder="Enter The Name"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            disabled={isLodding}
          />
          {registerForm.errors.name && registerForm.touched.name ? (
            <div className="alert alert-danger mt-3">
              {registerForm.errors.name}
            </div>
          ) : null}
        </div>
        <div className="form-group my-3">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-100 py-2 px-3"
            id="email"
            placeholder="Enter The Email"
            value={registerForm.values.email}
            name="email"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            disabled={isLodding}
          />
          {registerForm.errors.email && registerForm.touched.email ? (
            <div className="alert alert-danger mt-3">
              {registerForm.errors.email}
            </div>
          ) : null}
        </div>
        <div className="form-group my-3">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-100 py-2 px-3"
            id="password"
            placeholder="Enter The Password"
            value={registerForm.values.password}
            name="password"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            disabled={isLodding}
          />
          {registerForm.errors.password && registerForm.touched.password ? (
            <div className="alert alert-danger mt-3">
              {registerForm.errors.password}
            </div>
          ) : null}
        </div>
        <div className="form-group my-3">
          <label htmlFor="rePassword" className="mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-100 py-2 px-3"
            id="rePassword"
            value={registerForm.values.rePassword}
            name="rePassword"
            placeholder="Enter The Confirm Password"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            disabled={isLodding}
          />
          {registerForm.errors.rePassword && registerForm.touched.rePassword ? (
            <div className="alert alert-danger mt-3">
              {registerForm.errors.rePassword}
            </div>
          ) : null}
        </div>
        <div className="form-group my-3">
          <label htmlFor="phone" className="mb-1">
            Phone
          </label>
          <input
            type="text"
            className="w-100 py-2 px-3"
            id="phone"
            value={registerForm.values.phone}
            name="phone"
            placeholder="Enter The Phone"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            disabled={isLodding}
          />
          {registerForm.errors.phone && registerForm.touched.phone ? (
            <div className="alert alert-danger mt-3">
              {registerForm.errors.phone}
            </div>
          ) : null}
        </div>
        <div className="d-flex justify-content-end my-3">
          <button
            type="submit"
            className="btn text-light btn-success"
            disabled={!(registerForm.isValid&&registerForm.dirty)}
          >
            {isLodding ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </div>
      </form>
    </div>
    </>
 
  );
}
