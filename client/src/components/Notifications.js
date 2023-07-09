import { Divider, Modal, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { SetLoading } from '../redux/loadersSlice';
import { deleteNotification, markNotificationAsRead } from '../apicalls/notifications';
import { SetNotifications } from '../redux/usersSlice';

function Notifications({
    showNotifications,
    setShowNotifications,
    reloadDashboard
}) {

    const { notifications } = useSelector(state => state.users)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const readNotification = async () => {
        try {
            const response = await markNotificationAsRead()
            if (response.success) {
                dispatch(SetNotifications(response.data))
            }
        }
        catch (error) {
            message.error(error.message)
        }
    }

    const deleteNotifications = async () => {
        try {
            dispatch(SetLoading(true))
            const response = await deleteNotification()
            dispatch(SetLoading(false))
            if (response.success) {
                dispatch(SetNotifications([]))
                message.success(response.message)
            }
            else {
                message.error(response.message)
            }
        }
        catch (error) {
            dispatch(SetLoading(false))
            message.error(error.message)
        }
    }

    React.useEffect(() => {
        if (notifications.filter(notification => !notification.read).length > 0) {
            readNotification()
        }
    }, [])

    return (
        <Modal
            title="NOTIFICATIONS"
            open={showNotifications}
            onCancel={() => setShowNotifications(false)}
            centered
            footer={null}
            width={800}
        >
            <div className="flex flex-col gap-5">
                <div className='h-[1px] bg-gray-400 my-2'></div>
                {notifications.length > 0 ? <div className="flex justify-end">
                    <span className="font-semibold underline cursor-pointer"
                        onClick={deleteNotifications}
                    >
                        Delete All
                    </span>
                </div> : <span className="text-center">No Notifications</span> }
                {notifications.map((notification, index) => (
                    <div className='flex justify-between items-end mb-2 p-2 border border-solid rounded border-gray-300 cursor-pointer'
                        onClick={
                            () => {
                                setShowNotifications(false)
                                navigate(notification.onclick)
                            }
                        }
                    >
                        <div>
                            <p className='text-lg font-semibold'>{notification.title}</p>
                            <p className='text-sm'>{notification.description}</p>
                        </div>
                        <div>
                            <p className='text-sm'>{moment(notification.createdAt).fromNow()}</p>
                        </div>
                    </div>

                ))}
            </div>

        </Modal>
    )
}

export default Notifications