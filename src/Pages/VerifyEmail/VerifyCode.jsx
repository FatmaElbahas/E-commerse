import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyCode() {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const [codeLength, setCodeLength] = useState(); // default 6
  const [resetCode, setResetCode] = useState([]);

  useEffect(() => {
    const savedLength = Number(localStorage.getItem("codeLength")) || 6;
    setCodeLength(savedLength);
    setResetCode(Array(savedLength).fill(""));
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (value.length > 1) return;

    const updatedCode = [...resetCode];
    updatedCode[index] = value;
    setResetCode(updatedCode);

    if (value && index < codeLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !resetCode[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = resetCode.join("");
    const filledCount = resetCode.filter(Boolean).length;

    if (filledCount !== codeLength) {
      toast.error(`Please enter exactly ${codeLength} digits`);
      return;
    }

    let toastId;
    try {
      toastId = toast.loading("Verifying...");
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: code }
      );
      toast.dismiss(toastId);
      toast.success("Code verified");

      if (data.status === "Success") {
        setTimeout(() => {
          navigate("/ResetPassword");
        }, 1000);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Invalid code");
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl text-primary-700 font-semibold mb-6 flex items-center justify-center">
          <i className="fa-regular fa-circle-user me-3 text-3xl text-primary-700"></i>
          <span>Verify Code</span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-center gap-3 px-2">
            {resetCode.map((val, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={val}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-primary-700 text-white px-6 py-2 mt-4 rounded-md font-semibold hover:bg-primary-dark transition w-fit mx-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}