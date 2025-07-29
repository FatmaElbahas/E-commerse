import React, { useContext } from 'react'
import TokenProvider, { TokenContext } from '../../Context/TokenContext';

export default function GuardedRoutes({children}) {
   const {token}=useContext(TokenContext)
  if(token){
    return children;
       return <Navigate to={"./home"}/>

  }
  else{
    return children;
  }
}
