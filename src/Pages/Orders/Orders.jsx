import React, { useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios, { Axios } from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Components/Loading/Loading'
import { TokenContext } from '../../Context/TokenContext'
import { Link } from 'react-router'

export default function Orders() {
    const { token } = useContext(TokenContext)
    const { id } = jwtDecode(token)

    async function getUserOrders() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method: 'GET'
        }

        return await axios.request(options)
    }

    const { data, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: getUserOrders
    })


    if (isLoading) {
        return <Loading />
    }


    

    return (
        <>
          <div className="container my-10">
              {data.data.map((order) => (
                    <div className='my-3 border border-gray-300 rounded-md border-solid p-4'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h2 className='text-gray-400'>Order ID</h2>
                                <h3 className='font-semibold'>#{order.id}</h3>
                            </div>
                            <div>
                                {order.isDelivered ? (
                                    <span className=' btn py-2 text-white inline-block bg-primary me-2 text-sm'>
                                        Delivered
                                    </span>
                                ) : (
                                    <span className=' btn py-2 text-white inline-block bg-blue-600 me-2 text-sm'>
                                        under delivery
                                    </span>
                                )}
                                {order.isPaid ? (
                                    <span className='btn py-2 text-white inline-block bg-primary-600 text-sm'>
                                        Paid
                                    </span>
                                ) : (
                                    <span className='btn py-2 text-white inline-block bg-red-600 text-sm'>
                                        not paid
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className='grid grid-cols-12 gap-5'>
                            {order.cartItems.map((product) => (
                                <div className='mt-2 rounded-sm p-2 border border-gray-300 border-solid  col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3 2xl:col-span-2'>
                                    <img src={product.product.imageCover} className='w-full h-40 object-cover' alt="" />
                                    <div>
                                    <Link to={`/Product/${product.product.id}`}><h3 className='font-semibold my-2 line-clamp-1 '>{product.product.title}</h3></Link>                                        
                                    <span>{product.price} EGP</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))

            }
          </div>
        </>
    )
}
