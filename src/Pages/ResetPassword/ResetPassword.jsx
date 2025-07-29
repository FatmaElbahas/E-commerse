import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function ResetPassword() {
    const navigate = useNavigate();

    async function resetUserPass(values) {
        let id;

        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                method: "PUT",
                data: values,
            };

            id = toast.loading("waiting...");
            const { data } = await axios.request(options);

            toast.dismiss(id);
            toast.success("password changed");

            setTimeout(() => {
                if (data.token) {
                    navigate("/login");
                }
            }, 1000);
        } catch (error) {
            toast.error("wronf credentials");
            toast.dismiss(id);

            console.log(error);
        }
    }

    const validationSChema = yup.object({
        email: yup.string()
            .required("email is required")
            .email("email must be valid"),
        newPassword: yup.string()
            .required("password is required")
            .matches(
                /^[A-Z][a-zA-Z0-9]{5,25}$/,
                "password must start with capital letter followed by atleast 5 chars"
            ),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema: validationSChema,
        onSubmit: resetUserPass,
    });

    return (
        <>
     <section
  onSubmit={formik.handleSubmit}
  className="max-w-md mx-auto my-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200"
>
  <h2 className="text-3xl text-primary-700 font-bold flex items-center gap-3 mb-6">
    <i className="fa-regular fa-circle-user text-4xl text-primary-700"></i>
    <span>Reset Password</span>
  </h2>

  <form className="flex flex-col gap-6">
    {/* Email Input */}
    <div className="flex flex-col gap-1">
      <label htmlFor="email" className="text-gray-700 font-medium">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        className="form-control w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
        placeholder="Enter your email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email && (
        <span className="text-red-600 font-semibold text-sm">
          {formik.errors.email}
        </span>
      )}
    </div>

    {/* Password Input */}
    <div className="flex flex-col gap-1">
      <label htmlFor="newPassword" className="text-gray-700 font-medium">
        New Password
      </label>
      <input
        type="password"
        id="newPassword"
        className="form-control w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
        placeholder="Enter new password"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.newPassword && formik.touched.newPassword && (
        <span className="text-red-600 font-semibold text-sm">
          {formik.errors.newPassword}
        </span>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="bg-primary text-white py-2 px-6 rounded-md bg-primary-500 hover:bg-primary-900 transition duration-300 self-end"
    >
      Submit
    </button>
  </form>
</section>
        </>
    );
}
