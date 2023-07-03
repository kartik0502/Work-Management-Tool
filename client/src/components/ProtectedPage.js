import { message } from 'antd'
import { set } from 'mongoose'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUser } from '../apicalls/users'
import { useDispatch, useSelector } from 'react-redux'
import { SetUser } from '../redux/usersSlice'
import { SetLoading } from '../redux/loadersSlice'

function ProtectedPage({children}) {

    const Navigate = useNavigate()
    const dispatch = useDispatch()  
    const {user} = useSelector(state => state.users)
    const getLoggedInUser = async () => {
        try{
            dispatch(SetLoading(true));
            const response = await fetchUser();
            dispatch(SetLoading(false));
            if(response.success){
                dispatch(SetUser(response.data))
            }
            else{
                throw new Error(response.message)
            }
        }
        catch(error){
            dispatch(SetLoading(false));
            message.error(error.message)
            localStorage.removeItem('token')
            Navigate('/login')
        }
    }
    useEffect(() => {
        if(!localStorage.getItem('token')){
            Navigate('/login')
        }
        getLoggedInUser()
    }, [])

  return (
    user && <div>
        <div className='flex justify-between items-center bg-primary text-white px-5 py-2'>
            <h1 className='text-2xl font-bold cursor-pointer'
            onClick={() => Navigate('/')}>
                TaskMaster
            </h1>
            <div className='flex items-center bg-white px-5 py-4 rounded'> 
                <span className='text-black cursor-pointer' 
                onClick={() => {
                    Navigate('/profile')
                }}>
                    {user?.firstName}
                </span>
                <i className="ri-notification-line text-black mx-3 bg-gray-200 p-2 rounded-full"></i>
                <i className="ri-logout-box-r-line text-black ml-10 cursor-pointer"
                onClick={() => {
                    localStorage.removeItem('token')
                    Navigate('/login')
                }}>

                </i>
            </div>
        </div>
        <div className='px-5 py-3'>
            {children}
        </div>
    </div>
  )
}

export default ProtectedPage