import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUser } from '../apicalls/users'
import { useDispatch, useSelector } from 'react-redux'
import { SetNotifications, SetUser } from '../redux/usersSlice'
import { SetLoading } from '../redux/loadersSlice'
import { getNotifications } from '../apicalls/notifications'
import { Avatar, Badge, Space } from 'antd';
import Notifications from './Notifications'

function ProtectedPage({ children }) {

    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, notifications } = useSelector(state => state.users)
    const [showNotifications, setShowNotifications] = useState(false)

    const getLoggedInUser = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await fetchUser();
            dispatch(SetLoading(false));
            if (response.success) {
                dispatch(SetUser(response.data))
            }
            else {
                throw new Error(response.message)
            }
        }
        catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message)
            localStorage.removeItem('token')
            Navigate('/login')
        }
    }

    const getNotification = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await getNotifications();
            dispatch(SetLoading(false));
            if (response.success) {
                dispatch(SetNotifications(response.data))
            }
            else {
                throw new Error(response.message)
            }
        }
        catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            Navigate('/login')
        }
        getLoggedInUser()
    }, [])

    useEffect(() => {
        getNotification()
    }, [user])

    return (
        user && <div>
            <div className='flex justify-between items-center bg-primary text-white px-5 py-2'>
                <h1 className='text-2xl font-bold cursor-pointer'
                    onClick={() => Navigate('/')}>
                    TaskMaster
                </h1>
                <div className='flex items-center bg-white px-5 py-4 rounded'>
                    <span className='text-black cursor-pointer mr-2'
                        onClick={() => {
                            Navigate('/profile')
                        }}>
                        {user?.firstName}
                    </span>
                    <Badge count={
                        notifications?.filter(notification => !notification.read).length
                    }
                    className='cursor-pointer'
                    >
                        <Avatar shape="square" size="large" 
                        icon={<i className="ri-notification-line text-black rounded-full"></i>}
                        onClick={() => setShowNotifications(!showNotifications)}
                        />
                    </Badge>
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

            {
                showNotifications && 
                <Notifications showNotifications={showNotifications} setShowNotifications={setShowNotifications} reloadDashboard={getNotification} />
            }
        </div>
    )
}

export default ProtectedPage