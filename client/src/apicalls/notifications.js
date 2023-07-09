const { apiRequest } = require(".");

export const addNotification = async (data) => {
    return apiRequest( '/api/notifications/add','post', data);
}

export const getNotifications = async () => {
    return apiRequest( '/api/notifications/get-notification', 'get');
}

export const markNotificationAsRead = async () => {
    return apiRequest( '/api/notifications/mark-as-read', 'post');
}

export const deleteNotification = async () => {
    return apiRequest( '/api/notifications/delete-all', 'delete');
}