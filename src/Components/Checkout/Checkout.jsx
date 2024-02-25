import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { CartContext } from "../../Context/cartContent";

export default function Checkout() {
  let [errorMsg, setErrorMsg] = useState("");
  let [isLodding, setIsLodding] = useState(false);

  let { onlinePayment } = useContext(CartContext);
  async function payment(values) {
    setIsLodding(true);
    try {
      setErrorMsg("");
      let { data } = await onlinePayment(values);
      if (data.session && data.session.url) {
              window.location.href = data.session.url;
              setIsLodding(false);

      } else {
        setErrorMsg(data?.message)
      }
    } catch (error) {
      setIsLodding(false);
      setErrorMsg(error);
    }
  }

  const validationSchema = Yup.object({
    details: Yup.string()
      .min(3, "Details Is Too Short")
      .max(60, "Details Is Too Long")
      .required("Details is Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone")
      .required("Phone is Required"),
    city: Yup.string()
      .min(3, "City Is Too Short")
      .max(60, "City Is Too Long")
      .required("City is Required"),
  });
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: payment,
  });
  return (
    <>
      <div className="container my-5">
        <div className="mx-auto bg-main-light p-5">
          <h2> Shipping Address</h2>
          {errorMsg ? (
            <div className="alert alert-danger mt-3">{errorMsg}</div>
          ) : null}
          <form className="my-4" onSubmit={formik.handleSubmit}>
            <div className="form-group my-4">
              <label htmlFor="details" className="mb-1 fs-4">
                Details
              </label>
              <input
                type="text"
                className="w-100 py-2 px-3"
                id="details"
                name="details"
                placeholder="Details"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.errors.details && formik.touched.details ? (
                <div className="alert alert-danger mt-3">
                  {formik.errors.details}
                </div>
              ) : null}
            </div>
            <div className="form-group my-3">
              <label htmlFor="details" className="mb-1 fs-4">
                Phone
              </label>
              <input
                type="text"
                className="w-100  py-2 px-3"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="alert alert-danger mt-3">
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
            <div className="form-group my-3">
              <label htmlFor="details" className="mb-1 fs-4">
                City
              </label>
              <input
                type="text"
                className="w-100 py-2 px-3"
                id="city"
                name="city"
                placeholder="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.city && formik.touched.city ? (
                <div className="alert alert-danger mt-3">
                  {formik.errors.city}
                </div>
              ) : null}
            </div>

            <div className="d-flex justify-content-end my-3">
              <button
                type="submit"
                className="btn text-light bg-main fs-4 w-100 py-1 my-3"
                disabled={!(formik.isValid && formik.dirty)}
              >
                {isLodding ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Pay Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
