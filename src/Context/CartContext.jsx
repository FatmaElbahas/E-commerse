import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { TokenContext } from "./TokenContext";
import { toast } from "react-toastify";
import Loading from "../Components/Loading/Loading";
export const CartContext= createContext(null);
export default function CartProvider({children}){
            const{token}=useContext(TokenContext)
                      

const [cartInfo,setCartInfo]=useState(null);
useEffect(() => {
  if (token) {
    console.log("✅ Token exists. Fetching cart...");
    getAllCart();
  }
}, [token]);
   async function AddToCart(productId){

        const loading=toast.loading('Loading...........');
        try{ const options={
            url:'https://ecommerce.routemisr.com/api/v1/cart',
            method:'POST',
            data:{productId,

            },
            headers:{
                token,
            }
        }
        console.log(token);
        
       const{data}= await axios.request(options)
       console.log(data);
       
       if(data.status=='success'){
        toast.success(data.message)
        getAllCart();
       
       }
    }catch(error){
toast.error("errorrrr........");
console.log(data.statusMsg);
    }
    finally{
        toast.dismiss(loading)
    }
       
    }
    async function getAllCart(){
        const options={
         url:'https://ecommerce.routemisr.com/api/v1/cart',
         method:'GET',
         headers:{
            token,
         }   
        }
       const {data}= await axios.request(options);
       console.log(data);
       setCartInfo(data);
       
         console.log("infooo:", data.cartId);

    }
    async function removeItem(productId) {
                  const loading=toast.loading('Loading..............')

     try{

           const options={
            url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method:'DELETE',
            headers:{
                token,
            }
        }
        const {data}=await axios.request(options);
        setCartInfo(data);
        console.log(data);
        console.log("removed");
        toast.success("Product Removed From Cart Successfuly")
    }
     catch(error){
 toast.error('ERROR')
     }
    finally{
        toast.dismiss(loading);
    }
        
        
    }
    async function clearCart() {
        const loading=toast.loading('Loadind.....')
   try{
      const options={
         url:'https://ecommerce.routemisr.com/api/v1/cart',
      method:'DELETE',
      headers:{
        token,
      }
     }
       const{data}=await axios.request(options);
       console.log(data);
        setCartInfo({
            numOfCartItems:0,
    
        });
        toast.success(" All Items Are Removed Successfuly")
   }
   catch(error){
console.log(error);

   }
   finally{
    toast.dismiss(loading);
   }
    }
    async function updateCart(productID,count) {
        console.log("id", productID);
        console.log("count", count);
        const loading=toast.loading("Loading........")
 try{
      const options={
      url:`https://ecommerce.routemisr.com/api/v1/cart/${productID}`  ,
     method:'PUT', 
     data:{
        count,
    },
     headers:{
        token,
     },
   }
   const {data}= await axios.request(options);
   setCartInfo(data);
      console.log(data);
      toast.success("Count Updated")
console.log("updated");
 }
 catch(error){
console.log(error);

 }
 finally{
toast.dismiss(loading)
 }

    }
    return(
        <>
        <CartContext.Provider value={{AddToCart,getAllCart,cartInfo,removeItem,clearCart,updateCart}}>
{children}
        </CartContext.Provider>
        </>
    )
}