import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  let [errorMsg, setErrorMsg] = useState("");
  let [isLodding, setIsLodding] = useState(false);
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  async function callForgetPassword(reqBody) {
    setIsLodding(true);
    try {
      setErrorMsg("");
      let { data } = await axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
          reqBody
        )
        .catch((err) => {
          setIsLodding(false);
          setErrorMsg(err.response.data.message);
        });

      if (data.message === "Reset code sent to your email") {
        setIsLodding(false);
        navigate("/resetCode");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Email Not Valid").required("Email is Required"),
  });

  const forgetPassword = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: callForgetPassword,
  });

  return (
    <>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Forget Password</h2>
        {errorMsg ? (
          <div className="alert alert-danger mt-3">{errorMsg}</div>
        ) : null}
        <form onSubmit={forgetPassword.handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-100 px-3 py-2"
              id="email"
              value={forgetPassword.values.email}
              name="email"
              onChange={forgetPassword.handleChange}
              onBlur={forgetPassword.handleBlur}
              placeholder="Enter The Email"
              disabled={isLodding}
            />
            {forgetPassword.errors.email && forgetPassword.touched.email ? (
              <div className="alert alert-danger mt-3">
                {forgetPassword.errors.email}
              </div>
            ) : null}
          </div>

          <div className="d-flex justify-content-end my-3">
            <button
              type="submit"
              className="btn text-light btn-success"
              disabled={!(forgetPassword.isValid && forgetPassword.dirty)}
            >
              {isLodding ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Send Code To Email"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
