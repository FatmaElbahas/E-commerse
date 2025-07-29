import React from 'react'
import error from '../../assets/imgs/error.svg'
export default function NotFound() {
  return (
   <div className="container">
     <div className='flex items-center justify-center my-5'>
      <img src={error} alt="Not Found" />
    </div>
   </div>
  )
}
