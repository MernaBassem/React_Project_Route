import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../../Context/Token";
import { Helmet } from "react-helmet";
export default function Login() {
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");
  let [isLodding, setIsLodding] = useState(false);
  let { setToken } = useContext(TokenContext);
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
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        navigate("/");
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
        /^[a-zA-Z0-9]{6,30}$/,
        "invalid password, should be ex. aDnd345m and max length 30"
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
    <>
    
    <Helmet>
    <title>
        Login
      </title>
    </Helmet>
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
            className="w-100 py-2 px-3"
            id="email"
            value={loginForm.values.email}
            name="email"
            placeholder="Enter The Email"
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
            className="w-100 py-2 px-3"
            id="password"
            value={loginForm.values.password}
            name="password"
            placeholder="Enter The Password"
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

        <div className="d-flex justify-content-between my-3">
        <Link
      to="/forgetPassword"
      className="text-main fs-5 text-decoration-none"
      style={{ textDecoration: "none", ":hover": { textDecoration: "underline" } }}
    >
      Forget Password
    </Link>          <button
            type="submit"
            className="btn text-light btn-success"
            disabled={!(loginForm.isValid && loginForm.dirty)}
          >
            {isLodding ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
          </button>
        </div>
      </form>
     
    </div>
    
    </>
    
  );
}
