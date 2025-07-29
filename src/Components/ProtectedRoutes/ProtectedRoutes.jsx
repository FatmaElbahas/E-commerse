import React, { useContext } from 'react'
import { Navigate } from 'react-router';
import  { TokenContext } from '../../Context/TokenContext';

export default function ProtectedRoutes({children}) {
   let {token}=useContext(TokenContext)
  if(token){
    return children;
  }
  else{
   return <Navigate to={"./Login"}/>
  }
}
