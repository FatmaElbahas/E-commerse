import React, { useContext, useState } from 'react'
import loginImage from "../../assets/imgs/login-img.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router'
import { useFormik } from 'formik'
import * as yup from "yup";
import axios from 'axios'
import { toast } from 'react-toastify'
import { faClock, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faClockFour, faEnvelope, faEyeLowVision, faLock, faShieldHalved, faStar, faTruckFast, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { TokenContext } from '../../Context/TokenContext'
export default function Login() {
    const emailRegex=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const passwordRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const[inCorrectCredintial,setinCorrectCredintial]=useState(null);
    const[isShown,setIsShown]=useState("")
    const {setToken}=useContext(TokenContext)
    function passwordVisability(){
      setIsShown(!isShown)
    }
    const validationSchema= yup.object(
      {
        email:yup.string().required("email is required").email().matches(emailRegex,"invalid Email"),
        password:yup.string().required("passwords is required").matches(passwordRegex,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
       
      }
    )
    let navigate=useNavigate()
  async function handleSubmit(values){
    const loadingToast= toast.loading('loading.......')
    try {
      setinCorrectCredintial(null);
      const options = {
        method: "POST",
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        data: {
         
          email: values.email,
          password: values.password,
         
        }
      };
  
      const {data} = await axios.request(options);
      console.log(data);
      if(data.message==="success"){
            toast.success("Welcome Back");
           setToken(data.token);
            localStorage.setItem('token',data.token

            )
          setTimeout(()=>{navigate("/Home")},3000
    )
  }
    } catch (error) {
      console.log(error);
      setinCorrectCredintial(error.response.data.message);
    }
    finally{
  toast.dismiss(loadingToast);
    }
  }
    const formik=useFormik({
      initialValues:{
    
      email:"",
      password:"",
      
      },
      validationSchema:validationSchema,
      onSubmit:handleSubmit,
  
    })
  return (
  <>
 <main className=''>
   <div className="container grid grid-cols-1 gap-4 lg:grid-cols-2 ">
     {/* {left side} */}
    <div className="left-side p-10  space-y-2">
<img src={loginImage} alt="loginImage" className='w-full rounded-xl shadow-xl' />
<h2 className='text-2xl font-bold text-center'>Fresh Groceries Delivered</h2>
<p className='text-center font-medium w-[90%]'>Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
<ul className='flex items-center justify-center gap-4 *:flex *:content-center *:gap-2'>
  <li>
    <div className="icon text-primary-500">
      <FontAwesomeIcon icon={faTruckFast } />
    </div>
    <div className="content"> Free Delivery</div>
  </li>
  <li>
    <div className="icon text-primary-500">
<FontAwesomeIcon icon={faShieldHalved} />
    </div>
    <div className="content"> Free Delivery</div>
  </li>
  <li>
    <div className="icon text-primary-500">
<FontAwesomeIcon icon={faClockFour} />
    </div>
    <div className="content"> Free Delivery</div>
  </li>
</ul>
  </div>
    {/* {Right Side} */}
  <div className="right-side p-10 space-y-6 bg-white shadow-xl rounded-xl  ">
          <h1 className='text-3xl font-semibold text-center'><span className='text-primary-600'>Fresh</span>Cart</h1>

    <div className='text-center'>
      <h5 className='text-2xl font-semibold'>Welcome Back!</h5>
      <p className='mt-1'>Start your tresh journey with on today</p>
    </div>
    <div className='  flex flex-col  content-center text-center w-full gap-4 *:flex *:items-center *:gap-4 *:hover:bg-gray-100'>
      <button className='btn w-full bg-transparent border text-center flex items-center justify-center gap-0 border-gray-400/40 '>
        <FontAwesomeIcon icon={faGoogle} className='text-red-400' />
<span className=' '>Countinue with Google</span>
      </button>
      <button className='btn w-full bg-transparent border  flex items-center justify-center  border-gray-400/40 text-center '>
        <FontAwesomeIcon icon={faFacebook} className='text-blue-600 text-center' />
<span className=''>Countinue with Facebook</span>
      </button>
    </div>
    <div className='relative w-full h-0.5 bg-gray-300/30 '>
      <span className='bg-white  absolute left-1/2 top-1/2 -translate-1/2 '>
        OR CONTINUE WITH EMAIL
      </span>
    </div>
    <form action=""onSubmit={formik.handleSubmit}>
    
      <div className="email flex flex-col gap-1 relative">
<label htmlFor="email" className='font-bold'>Email Address</label>
<input type="email" placeholder='Ali@route.com' id='email' className='form-control pl-10  border-t-2 border-s-2 border-e-2 py-2' 
 name='email'
value={formik.values.email}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
 />
 {formik.touched.email&&formik.errors.email&& <p className='text-red-500'>{formik.errors.email}</p>}

<div className="icon absolute top-1/2  left-3 text-gray-500 "><FontAwesomeIcon icon={faEnvelope} />
</div>      
</div>
<div className="password flex flex-col gap-1 relative">
  <div className="flex justify-between items-center">
    <label htmlFor="password" className="font-bold">Password</label>
    <Link to="/ForgetPassword" className="text-primary-600 font-medium">Forgot Password?</Link>
  </div>

  <input
    type={isShown ? "text" : "password"}
    placeholder="Enter Your Password"
    id="password"
    className="form-control pl-10 border-t-2 border-s-2 border-e-2 py-2"
    name="password"
    value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />

  {/* رسالة الخطأ */}
  {formik.touched.password && formik.errors.password && (
    <p className="text-red-500">{formik.errors.password}</p>
  )}
  {inCorrectCredintial && (
    <p className="text-red-500">{inCorrectCredintial}</p>
  )}

  {/* أيقونة القفل */}
<span className="absolute top-9 left-3 text-gray-500">
  <FontAwesomeIcon icon={faLock} />
</span>

  {/* أيقونة العين تظهر فقط عند وجود كتابة */}
  {formik.values.password && (
    <span
      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
      onClick={passwordVisability}
    >
      <FontAwesomeIcon icon={isShown ? faEyeSlash : ""} />
    </span>
  )}
</div>
      <div className="terms flex items-center gap-3 my-2">
             <input type="checkbox" id="terms" className='accent-primary-600 size-4'
              name='keepSigned'
     value={formik.values.keepSigned}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
             />
     
     <label htmlFor="KeepSigned">Keep me Signed in </label>
     
           </div>


      <button type='submit' className="btn mt-3 w-full flex item-center justify-center gap-2 bg-primary-600 text-white hover:bg-primary-700 disabled:bg-red-400"disabled={!(formik.isValid)}>
       Sign in
      </button>
    </form>
    <p className='border-gray-300/30  border-t text-center'>
     New to FreshCart? <Link to={"/Signup"} className='text-primary-400 underline '>Create an accoun</Link>
    </p>
    <ul className='flex items-center justify-center gap-4 *:flex *:gap-2 *:items-center *:justify-center'>
      <li>
        <div className="icon">
          <FontAwesomeIcon icon={faLock} />
        </div>
        SSSL Secured
      </li>
      <li>
        <div className="icon">
<FontAwesomeIcon icon={faUsers} />
        </div>
        50K+ Users
      </li>
      <li>
        <div className="icon">
<FontAwesomeIcon icon={faStar} />
        </div>
        4.5 Rating
      </li>
    </ul>
  </div>
   </div>
 </main>
  </>
  )
}
