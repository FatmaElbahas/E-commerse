import React, { createContext, useState } from 'react'
 export const TokenContext= createContext(null);
  export default function TokenProvider({children}){
 let[token,setToken]=useState(localStorage.getItem('token'))
   function Logout() {
setToken(null);
localStorage.removeItem('token')
}
 return(
    <>
    <TokenContext.Provider value={{token,setToken,Logout}}>

{children}
    </TokenContext.Provider>
    
    </>
 )
   }
  

