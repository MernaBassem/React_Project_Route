import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../../Context/Token";
import { Helmet } from "react-helmet";
export default function ResetPassword() {
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");
  let [isLoading, setisLoading] = useState(false);
  let { setToken } = useContext(TokenContext);
  async function callResetPassword(reqBody) {
  
    setisLoading(true);
    try {
      setErrorMsg("");
      let { data } = await axios
        .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword `, reqBody)
        .catch((err) => {
          setisLoading(false);
          setErrorMsg(err.response.data.message);
        });

      if (data) {
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        navigate("/");
      } else {
        console.log("data massage",data.message);
        console.log("data is",data);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Email Not Valid").required("Email is Required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^[a-zA-Z0-9]{6,30}$/,
        "invalid password, should be ex. aDnd345m and max length 30"
      )
      .required("Password is Required"),
  });

  const resetPasswordForm = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: callResetPassword,
  });

  return (
    <>
    
    <Helmet>
    <title>
        ResetPassword
      </title>
    </Helmet>
    <div className="w-50 mx-auto my-5">
      <h2 className="mb-3">ResetPassword Now</h2>
      {errorMsg ? (
        <div className="alert alert-danger mt-3">{errorMsg}</div>
      ) : null}
      <form onSubmit={resetPasswordForm.handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-100 py-2 px-3"
            id="email"
            value={resetPasswordForm.values.email}
            name="email"
            placeholder="Enter Email"
            onChange={resetPasswordForm.handleChange}
            onBlur={resetPasswordForm.handleBlur}
            disabled={isLoading}
          />
          {resetPasswordForm.errors.email && resetPasswordForm.touched.email ? (
            <div className="alert alert-danger mt-3">
              {resetPasswordForm.errors.email}
            </div>
          ) : null}
        </div>
        <div className="form-group my-3">
          <label htmlFor="newPassword" className="mb-1">
           New Password
          </label>
          <input
            type="password"
            className="w-100 py-2 px-3"
            id="newPassword"
            value={resetPasswordForm.values.newPassword}
            name="newPassword"
            placeholder="Enter The New Password"
            onChange={resetPasswordForm.handleChange}
            onBlur={resetPasswordForm.handleBlur}
            disabled={isLoading}
          />
          {resetPasswordForm.errors.newPassword && resetPasswordForm.touched.newPassword ? (
            <div className="alert alert-danger mt-3">
              {resetPasswordForm.errors.newPassword}
            </div>
          ) : null}
        </div>

        <div className="d-flex justify-content-between my-3">
           <button
            type="submit"
            className="btn text-light btn-success"
            disabled={!(resetPasswordForm.isValid && resetPasswordForm.dirty)}
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Reset Password"}
          </button>
        </div>
      </form>
     
    </div>
    
    </>
    
  );
}
