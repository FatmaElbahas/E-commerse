import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function ForgetPassword() {
    const navigate = useNavigate();

    async function checkEmail(values) {
        let id;

        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                method: "POST",
                data: values,
            };
            id = toast.loading("waiting...");
            const { data } = await axios.request(options);
            
            toast.dismiss(id);
            toast.success(data.message)

          setTimeout(() => {
  if (data.statusMsg === "success") {
    // نحدد طول الكود يدويًا أو من الباك لو موجود
    const dynamicCodeLength = 6; // أو 5 أو 6 حسب اللي الباك بيبعت فيه
    localStorage.setItem("codeLength", dynamicCodeLength);

    navigate("/VerifyCode");
  }
}, 1000);


        } catch (error) {
            console.log(error);
            
        }
    }

    const validationSChema = yup.object({
        email: yup.string()
            .required("email is required")
            .email("email must be valid"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSChema,
        onSubmit: checkEmail,
    });

    return (
        <>
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
  <section className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl text-primary-700 font-semibold mb-6 flex items-center">
      <i className="fa-regular fa-circle-user me-2 text-primary-700 text-3xl"></i>
      Forget Password
    </h2>

    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email && (
          <p className="text-red-600 text-sm mt-1 font-medium">
            {formik.errors.email}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-md bg-primary-700 transition w-full font-medium"
      >
        Submit
      </button>
    </form>
  </section>
</div>
        </>
    );
}
