import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faShieldHalved, faStar, faTruckFast, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Author from "../../assets/imgs/review-author.png"
import { Link, useNavigate } from 'react-router'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup";
import axios from 'axios'
import { toast } from 'react-toastify'
export default function Signup() {
  const emailRegex=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const passwordRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  const[isExistEmail,setIsExist]=useState(null);
  const validationSchema= yup.object(
    {
      name:yup.string() .required("name is required"),
      email:yup.string().required("email is required").email().matches(emailRegex,"invalid Email"),
      password:yup.string().required("passwords is required").matches(passwordRegex,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
      rePassword: yup
     .string()
     .required("Please confirm your password")
     .oneOf([yup.ref("password")], "Passwords must match"),
      phone:yup.string().required("phone is required").matches(phoneRegex),
      terms:yup.boolean().oneOf([true],"You Must agree to Our Terms and Conditions"),
    }
  )
  let navigate=useNavigate()
async function handleSubmit(values){
  try {
    const options = {
      method: "POST",
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        rePassword: values.rePassword,
        phone: values.phone,
      }
    };

    const {data} = await axios.request(options);
    console.log(data);
    if(data.message==="success"){
          toast.success("Your Account has been created");
        setTimeout(()=>{navigate("/login")},3000
  )
}
  } catch (error) {
    setIsExist(error.response.data.message);
  }
}
  const formik=useFormik({
    initialValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
    terms:false,
    },
    validationSchema:validationSchema,
    onSubmit:handleSubmit,

  })
  return (
<>
<main className='py-12'>
 <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
   {/* {Left Side} */}
  <div className="left-side p-10 space-y-8">
    <div className="welcome-message">
      <h2 className='font-bold text-3xl'>Welcome to <span className='text-primary-500'>FreshCart</span></h2>
      <p className='text-lg mt-2'>thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.</p>
    </div>
    <ul className='*:flex *:items-center space-y-5  *:gap-4'>
      <li>
        <div className="icon size-12 rounded-full text-xl flex items-center justify-center text-primary-600 bg-primary-200 ">
          <FontAwesomeIcon icon={faStar} />
        </div>
        <div className="content">
          <h3 className='font-semibold'>Premium Quality</h3>
          <p className='text-gray-600'>Premium quality products sourced from trusted suppliers</p>
        </div>
      </li>
      <li>
        <div className="icon size-12 rounded-full text-xl flex items-center justify-center text-primary-600 bg-primary-200 ">
          <FontAwesomeIcon icon={faTruckFast} />
        </div>
        <div className="content">
          <h3 className='font-semibold'>Fast Delivery</h3>
          <p className='text-gray-600'>Same-day delivery availablo in most areas</p>
        </div>
      </li>
      <li>
        <div className="icon size-12 rounded-full text-xl flex items-center justify-center text-primary-600 bg-primary-200 ">
          <FontAwesomeIcon icon={faShieldHalved} />
        </div>
        <div className="content">
          <h3 className='font-semibold'>Secure Shopping</h3>
          <p className='text-gray-600'>Your data and payments are completely secure</p>
        </div>
      </li>
    </ul>
    <div className="review bg-white shadow-md p-6 rounded-xl">
      <div>
      <div className='flex items-center gap-4'>
          <img src={Author} className='size-12 rounded-full' alt="Sarah Johnson" />
        <div>
          <h3>Sarah Johnson</h3>
          <div className="rating">
            <FontAwesomeIcon icon={faStar} className='text-amber-300' />
            <FontAwesomeIcon icon={faStar} className='text-amber-300' />
            <FontAwesomeIcon icon={faStar} className='text-amber-300' />
            <FontAwesomeIcon icon={faStar}  className='text-amber-300'/>
            <FontAwesomeIcon icon={faStar} className='text-amber-300' />
          </div>
        </div>
      </div>
      </div>
      <blockquote className='italic text-sm'>
"        FreshCart has transformed my shopping experience, The quality of the products is outstanding and the dellvery is always on time. Highly recommendi"      </blockquote>
    </div>
  </div>
  {/* {Right Side} */}
  <div className="right-side p-10 space-y-8 bg-white shadow-xl rounded-xl ">
    <div>
      <h2 className='text-3xl font-semibold'>Create Your Account</h2>
      <p className='mt-1'>Start your tresh journey with on today</p>
    </div>
    <div className='  flex justify-center w-full gap-4 *:flex *:items-center *:gap-4 *:hover:bg-gray-100'>
      <button className='btn w-full bg-transparent border border-gray-400/40 '>
        <FontAwesomeIcon icon={faGoogle} className='text-red-400' />
<span>Google</span>
      </button>
      <button className='btn w-full bg-transparent border border-gray-400/40 '>
        <FontAwesomeIcon icon={faFacebook} className='text-blue-600' />
<span>Facebook</span>
      </button>
    </div>
    <div className='relative w-full h-0.5 bg-gray-300/30 '>
      <span className='bg-white  absolute left-1/2 top-1/2 -translate-1/2 '>
        or
      </span>
    </div>
    <form action="" onSubmit={formik.handleSubmit}>
      <div className="name flex flex-col gap-1">
<label htmlFor="name">Name*</label>
<input
 type="text" placeholder='Ali' id='name' className='form-control'
 name='name'
value={formik.values.name}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>
{formik.touched.name&&formik.errors.name&& <p className='text-red-500'>{formik.errors.name}</p>}
      </div>
      <div className="email flex flex-col gap-1">
<label htmlFor="email">Email*</label>
<input type="email" placeholder='Ali@route.com' id='email' className='form-control' 
 name='email'
value={formik.values.email}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
 />
 {formik.touched.email&&formik.errors.email&& <p className='text-red-500'>{formik.errors.email}</p>}
 {isExistEmail&& <p className='text-red-500'>{isExistEmail}</p>
}

      </div>
      <div className="password flex flex-col gap-1">
<label htmlFor="password">Password*</label>
<input type="password" placeholder='Create aStrong Password' id='password' className='form-control' 
 name='password'
value={formik.values.password}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>
{formik.touched.password&&formik.errors.password&& <p className='text-red-500'>{formik.errors.password}</p>}

<div className="password-strength flex items-center">
  <div className="bar bg-gray-300 h-1 w-full">
    <div className="progress bg-red-500 w-1/4 h-full"></div>
  </div>
  <span>Week</span>
</div>
      </div>
      <div className="repassword flex flex-col gap-1">
<label htmlFor="repassword">Confirm Password*</label>
<input type="password" placeholder='Confirm Your password' id='repassword' className='form-control'
 name='rePassword'
value={formik.values.rePassword}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
 />
 {formik.touched.rePassword&&formik.errors.rePassword&& <p className='text-red-500'>{formik.errors.rePassword}</p>}

      </div>
      <div className=" flex flex-col gap-1">
<label htmlFor="phone">Phone Number*</label>
<input type="tel" placeholder='01148903578' id='phone' className='form-control'
 name='phone'
value={formik.values.phone}
onChange={formik.handleChange}
onBlur={formik.handleBlur} />
{formik.touched.phone&&formik.errors.phone&& <p className='text-red-500'>{formik.errors.phone}</p>}

      </div>
      <div className="terms flex items-center gap-3 my-2">
        <input type="checkbox" id="terms" className='accent-primary-600 size-4'
         name='terms'
value={formik.values.terms}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
        />

<label htmlFor="terms">I agree to the <Link className='text-primary-400 underline overflow-hiddens'>Terms of Service</Link> and <Link className='text-primary-400 underline '>Privacy Policy</Link> *</label>

      </div>
              {formik.touched.terms&&formik.errors.terms&& <p className='text-red-500'>{formik.errors.terms}</p>}

      <button type='submit' className="btn mt-3 w-full flex item-center justify-center gap-2 bg-primary-600 text-white hover:bg-primary-700 disabled:bg-red-400"disabled={!(formik.isValid)}>
        <FontAwesomeIcon icon={faUserPlus} /> 
        Create My Account
      </button>
    </form>
    <p className='border-gray-300/30  border-t text-center'>
      Already have on account? <Link to={"/login"} className='text-primary-400 underline '>sign in</Link>
    </p>
  </div>
 </div>
</main>

</>
    
  )
}
