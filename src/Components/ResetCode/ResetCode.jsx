import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ResetCode = () => {
  let [errorMsg, setErrorMsg] = useState("");
  let [isLodding, setIsLodding] = useState(false);
  let navigate = useNavigate();

  async function callResetPassword(reqBody) {
    setIsLodding(true);
    try {
      setErrorMsg("");
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        reqBody
      );

      if (response.data) {
        const { status } = response.data;
        if (status === "Success") {
          setIsLodding(false);
          navigate("/resetPassword");
        } else {
          setIsLodding(false);
          setErrorMsg(status);
          console.error("Reset password failed:", status);
          console.error("data:", response.data);
          console.error("data:", response);

        }
      }
    } catch (error) {
      setIsLodding(false);
      console.error("Reset password failed:", error);
      setErrorMsg(error.response ? error.response.data.message : "An error occurred");
    }
  }

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .matches(/^[0-9]{4,7}$/, "Invalid Reset resetCode")
      .required("Reset resetCode is Required"),
  });

  const resetPassword = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: callResetPassword,
  });

  return (
    <>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Reset resetCode</h2>
        {errorMsg ? (
          <div className="alert alert-danger mt-3">{errorMsg}</div>
        ) : null}
        <form onSubmit={resetPassword.handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="resetCode" className="mb-1 fs-4">
              resetCode
            </label>
            <input
              type="text"
              className="w-100 px-3 py-2"
              id="resetCode"
              value={resetPassword.values.resetCode}
              name="resetCode"
              onChange={resetPassword.handleChange}
              onBlur={resetPassword.handleBlur}
              placeholder="Enter The Reset resetCode"
              disabled={isLodding}
            />
            {resetPassword.errors.resetCode && resetPassword.touched.resetCode ? (
              <div className="alert alert-danger mt-3">
                {resetPassword.errors.resetCode}
              </div>
            ) : null}
          </div>

          <div className="d-flex justify-content-end my-3">
            <button
              type="submit"
              className="btn text-light btn-success"
              disabled={!(resetPassword.isValid && resetPassword.dirty)}
            >
              {isLodding ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetCode;
